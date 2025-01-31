import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth();
    const searchParams = request.nextUrl.searchParams;
    const beforeDate = searchParams.get("beforeDate");
    const { userId } = await params;
    const LIMIT = 4;

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log({ beforeDate });
    // 먼저 날짜만 추출하여 고유한 날짜 목록 가져오기
    const uniqueDates = await db.post.findMany({
      where: {
        authorId: userId,
        date: {
          ...(beforeDate
            ? { lt: new Date(beforeDate) }
            : {
                lte: new Date(new Date().setHours(23, 59, 59, 999)),
              }),
        },
        isPrivate: session.user.id === userId ? undefined : false,
      },
      select: {
        date: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    // 날짜만 비교하여 중복 제거
    const dateSet = [
      ...new Set(
        uniqueDates.map(({ date }) => {
          const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
          return koreanDate.toISOString().split("T")[0];
        })
      ),
    ];
    const limitedDates = dateSet.slice(0, LIMIT);

    const result = await Promise.all(
      limitedDates.map(async (dateStr) => {
        const date = new Date(dateStr);
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0); // 해당 날짜 00시 00분부터
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999); // 해당 날짜 23시 59분 59초 999밀리초까지

        const [count, post] = await Promise.all([
          db.post.count({
            where: {
              authorId: userId,
              date: {
                gte: startDate,
                lt: endDate,
              },
              isPrivate: session.user.id === userId ? undefined : false,
            },
          }),
          db.post.findFirst({
            where: {
              authorId: userId,
              date: {
                gte: startDate,
                lt: endDate,
              },
              isPrivate: session.user.id === userId ? undefined : false,
            },
            select: {
              imageUrl: true,
            },
            orderBy: {
              date: "desc",
            },
          }),
        ]);

        return {
          date: dateStr,
          count,
          thumbnailUrl: post?.imageUrl ?? null,
        };
      })
    );

    return Response.json(result);
  } catch (error) {
    console.error("[POSTS_DATE_GROUPS_GET_ERROR]", error);
    return Response.json(
      { message: "Failed to fetch date groups" },
      { status: 500 }
    );
  }
}

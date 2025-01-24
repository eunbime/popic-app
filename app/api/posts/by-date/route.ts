import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return Response.json(
        { error: "Missing required dateStr" },
        { status: 400 }
      );
    }

    const userId = searchParams.get("userId");
    // KST 기준 시작/종료 시간 설정
    const date = new Date(dateStr);
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    if (!date || !userId) {
      return Response.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const skip = parseInt(searchParams.get("skip") || "0");
    const limit = parseInt(searchParams.get("limit") || "5");

    const posts = await db.post.findMany({
      where: {
        authorId: userId as string,
        date: {
          gte: startDate,
          lt: endDate,
        },
        isPrivate: session.user.id === userId ? undefined : false,
      },
      include: {
        likes: true,
        author: true,
      },
      skip,
      take: limit,
      orderBy: {
        date: "desc",
      },
    });

    return Response.json(posts);
  } catch (error) {
    console.log("[POSTS_BY_DATE_GET]", error);
    return Response.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
}

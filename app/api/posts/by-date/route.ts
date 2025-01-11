import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return Response.json([]);
    }

    // KST 기준 시작/종료 시간 설정
    const date = new Date(dateStr);
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    const posts = await db.post.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
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

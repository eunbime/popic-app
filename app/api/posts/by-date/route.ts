import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return Response.json([]);
    }

    // 날짜 문자열에서 시간을 제외한 부분만 사용
    const date = new Date(dateStr).toISOString().split("T")[0];

    const posts = await db.post.findMany({
      where: {
        date: {
          gte: new Date(`${date}T00:00:00.000Z`),
          lt: new Date(`${date}T23:59:59.999Z`),
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

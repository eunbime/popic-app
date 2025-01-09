import { db } from "@/lib/db";

export async function GET() {
  try {
    // 모든 포스트를 날짜순으로 가져옴
    const posts = await db.post.findMany({
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        date: true,
        imageUrl: true,
      },
    });

    // 날짜별로 그룹화
    const groupedPosts = posts.reduce(
      (groups: { [key: string]: number }, post) => {
        const date = new Date(post.date).toISOString().split("T")[0];
        groups[date] = (groups[date] || 0) + 1;
        return groups;
      },
      {}
    );

    // 배열 형태로 변환
    const dateGroups = Object.entries(groupedPosts).map(([date, count]) => ({
      date,
      count,
      thumbnailUrl:
        posts.find(
          (post) =>
            new Date(post.date).toISOString().split("T")[0] === date &&
            post.imageUrl
        )?.imageUrl || null,
    }));

    return Response.json(dateGroups);
  } catch (error) {
    console.log("[POSTS_DATE_GROUPS_GET_ERROR]", error);
    return Response.json(
      { message: "Failed to fetch date groups" },
      { status: 500 }
    );
  }
}

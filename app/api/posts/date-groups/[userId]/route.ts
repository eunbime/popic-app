import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    // 모든 포스트를 날짜순으로 가져옴
    const posts = await db.post.findMany({
      where: {
        authorId: userId,
      },
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
        // UTC 날짜를 KST(UTC+9)로 변환
        const utcDate = new Date(post.date);
        const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
        const date = kstDate.toISOString().split("T")[0];

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
        posts.find((post) => {
          const utcDate = new Date(post.date);
          const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
          return kstDate.toISOString().split("T")[0] === date && post.imageUrl;
        })?.imageUrl || null,
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

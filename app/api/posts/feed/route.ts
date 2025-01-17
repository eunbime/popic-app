import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const GET = async (request: Request) => {
  try {
    const session = await auth();
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skip = parseInt(url.searchParams.get("skip") || "0");
    const limit = parseInt(url.searchParams.get("limit") || "5");

    const posts = await db.post.findMany({
      where: {
        NOT: {
          authorId: session.user.id,
        },
        isPrivate: false,
        ...(filter === "following" && {
          author: {
            followers: {
              some: {
                id: session.user.id,
              },
            },
          },
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        likes: true,
      },

      orderBy: {
        date: "desc",
      },
      skip,
      take: limit,
    });
    console.log("Found posts:", posts); // 조회된 게시물 확인

    return NextResponse.json(posts);
  } catch (error) {
    console.log("[FEED_POSTS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

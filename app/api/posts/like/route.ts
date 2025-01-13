import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const likedPosts = await db.post.findMany({
      where: {
        likes: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        likes: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(likedPosts);
  } catch (error) {
    console.error("[LIKED_POSTS_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { postId } = await req.json();
    if (!postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }

    // 현재 좋아요 상태 확인
    const existingLike = await db.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    // 좋아요가 있으면 삭제, 없으면 생성
    if (existingLike) {
      await db.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      await db.like.create({
        data: {
          userId: session.user.id,
          postId,
        },
      });
    }

    // 업데이트된 좋아요 수 조회
    const updatedPost = await db.post.findUnique({
      where: { id: postId },
      include: { likes: true },
    });

    return NextResponse.json({
      isLiked: !existingLike,
      likesCount: updatedPost?.likes.length || 0,
    });
  } catch (error) {
    console.error("[LIKE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

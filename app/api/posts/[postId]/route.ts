import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const values = await req.json();
    const { postId } = await params;

    // 포스트 존재 여부 확인
    const existingPost = await db.post.findUnique({
      where: { id: postId, authorId: session.user.id },
    });

    if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // 작성자 확인
    if (existingPost.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        title: values.title,
        content: values.content,
        date: new Date(values.date),
        imageUrl: values.imageUrl,
        isPrivate: values.isPrivate,
        tags: values.tags,
      },
    });

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log("[POSTS_PUT_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;

    // 포스트 존재 여부 확인
    const existingPost = await db.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // 작성자 확인
    if (existingPost.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await db.post.delete({ where: { id: postId } });

    return NextResponse.json({ message: "Post deleted", status: 200 });
  } catch (error) {
    console.log("[POSTS_DELETE_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to delete post" },
      { status: 500 }
    );
  }
}

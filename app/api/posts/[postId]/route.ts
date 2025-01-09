import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const data = await req.json();
    const { postId } = await params;

    const post = await db.post.update({
      where: { id: postId },
      data: { ...data },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post updated" });
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
    const { postId } = await params;
    await db.post.delete({ where: { id: postId } });

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.log("[POSTS_DELETE_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to delete post" },
      { status: 500 }
    );
  }
}

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const data = await req.json();

    const post = await db.post.update({
      where: { id: params.postId },
      data: { ...data },
    });

    return NextResponse.json({ message: "Post updated" });
  } catch (error) {
    console.log("[POSTS_PUT_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
}

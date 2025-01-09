import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        date: "asc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log("[POSTS_GET_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const post = await db.post.create({
    data: {
      title: data.title,
      content: data.content,
      date: data.date,
      imageUrl: data.imageUrl,
      authorId: data.authorId,
    },
  });

  return NextResponse.json({ message: "Post uploaded" });
}

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
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to fetch posts", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const post = await db.post.create({
      data: data,
    });

    if (!post) {
      return NextResponse.json(
        { message: "Failed to create post" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Post uploaded" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to create post", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}

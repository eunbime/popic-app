import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

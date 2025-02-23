import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth();
    const { userId } = await params;

    if (!session || session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await db.post.findMany({
      where: {
        authorId: userId,
      },
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
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

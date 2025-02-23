import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// 팔로우하기
export async function POST(
  _: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.id === userId) {
      return new NextResponse("Cannot follow yourself", { status: 400 });
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json({ message: "Successfully followed" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to follow user", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Failed to follow user" },
      { status: 500 }
    );
  }
}

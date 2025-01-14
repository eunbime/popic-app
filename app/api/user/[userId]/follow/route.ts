import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// 팔로우하기
export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 자기 자신을 팔로우하는 것 방지
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
    console.log("[USER_FOLLOW_POST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// 언팔로우하기
export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          disconnect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json({ message: "Successfully unfollowed" });
  } catch (error) {
    console.log("[USER_UNFOLLOW_POST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

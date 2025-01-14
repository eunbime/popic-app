import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// 언팔로우하기
export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.user.update({
      where: {
        id: params.userId,
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

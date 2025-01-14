import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = params;

    const following = await db.user.findUnique({
      where: {
        id: userId,
        followers: {
          some: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(!!following);
  } catch (error) {
    console.log("[USER_FOLLOWING_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

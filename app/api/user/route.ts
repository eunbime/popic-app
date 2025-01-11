import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("[USER_GET_ERROR]", error);
    return NextResponse.json(
      { message: "Error fetching user", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { name, bio, image } = await req.json();

    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await db.user.update({
      where: { id: session.user.id },
      data: { name, bio, image },
    });

    return NextResponse.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("[USER_PUT_ERROR]", error);
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

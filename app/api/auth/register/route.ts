import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    const user = await db.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "User creation failed" },
      { status: 500 }
    );
  }
}

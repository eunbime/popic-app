import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const keyword = req.nextUrl.searchParams.get("keyword");
    const limit = req.nextUrl.searchParams.get("limit");
    const offset = req.nextUrl.searchParams.get("offset");
    const sort = req.nextUrl.searchParams.get("sort");

    const users = await db.user.findMany({
      where: {
        name: {
          contains: keyword || "",
        },
        isPrivate: false,
      },
      take: Number(limit),
      skip: Number(offset),
      orderBy: {
        createdAt: sort === "desc" ? "desc" : "asc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error", message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

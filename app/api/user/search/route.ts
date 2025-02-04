import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
}

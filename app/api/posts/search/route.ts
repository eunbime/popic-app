import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const keyword = req.nextUrl.searchParams.get("keyword");
  const limit = req.nextUrl.searchParams.get("limit");
  const skip = req.nextUrl.searchParams.get("skip");
  const order = req.nextUrl.searchParams.get("order");

  const posts = await db.post.findMany({
    where: {
      title: {
        contains: keyword || "",
      },
      isPrivate: false,
    },
    take: Number(limit),
    skip: Number(skip),
    orderBy: {
      createdAt: order as "asc" | "desc",
    },
    include: {
      author: true,
      likes: true,
    },
  });

  return NextResponse.json(posts);
};

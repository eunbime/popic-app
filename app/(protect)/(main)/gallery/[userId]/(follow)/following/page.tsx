"use client";

import { getFollowingList } from "@/api/user";
import FollowList from "@/components/gallery/follow-list";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function FollowingPage() {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];

  const { data: followingList, isLoading } = useQuery<User[]>({
    queryKey: ["followingList"],
    queryFn: () => getFollowingList(userId),
  });

  return <FollowList listData={followingList || []} />;
}

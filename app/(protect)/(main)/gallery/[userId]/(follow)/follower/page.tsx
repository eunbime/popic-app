"use client";

import { getFollowerList } from "@/api/user";
import FollowList from "@/components/gallery/follow-list";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function FollowerPage() {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];

  const { data: followerList, isLoading } = useQuery<User[]>({
    queryKey: ["followerList"],
    queryFn: () => getFollowerList(userId),
  });

  return <FollowList listData={followerList || []} />;
}

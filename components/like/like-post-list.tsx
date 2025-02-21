"use client";

import { useQuery } from "@tanstack/react-query";
import LikePostBox from "./like-post-box";
import { getLikePosts } from "@/api/posts";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

const LikePostList = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["like-posts", filter],
    queryFn: () => getLikePosts(filter),
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-7">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-[110px] h-[110px] rounded-sm bg-gray-200 dark:bg-muted-foreground"
          />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-7">
      {posts?.map((post) => (
        <LikePostBox key={post.id} post={post} />
      ))}
    </div>
  );
};

export default LikePostList;

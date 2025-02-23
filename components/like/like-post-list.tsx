"use client";

import { useSearchParams } from "next/navigation";

import { useLikePosts } from "@/hooks/posts/useLikePosts";
import LikePostBox from "@/components/like/like-post-box";
import LikePostsSkeleton from "@/components/skeleton/like-posts-skeleton";

const LikePostList = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const { data: posts, isLoading } = useLikePosts(filter || "all");

  if (isLoading) return <LikePostsSkeleton />;

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-7">
      {posts?.map((post) => (
        <LikePostBox key={post.id} post={post} />
      ))}
    </div>
  );
};

export default LikePostList;

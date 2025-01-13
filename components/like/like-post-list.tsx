"use client";

import { useQuery } from "@tanstack/react-query";
import LikePostBox from "./like-post-box";
import { getLikePosts } from "@/api/posts";

const LikePostList = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["like-posts"],
    queryFn: () => getLikePosts(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className=" grid grid-cols-3 gap-5 p-5">
      {posts?.map((post) => (
        <LikePostBox key={post.id} post={post} />
      ))}
    </div>
  );
};

export default LikePostList;

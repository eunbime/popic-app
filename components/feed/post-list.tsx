"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";

import { useInfinitePosts } from "@/hooks/posts/useInfinitePosts";
import PostBox from "@/components/feed/post-box";
import FeedPostsSkeleton from "@/components/skeleton/feed-posts-skeleton";

const PostList = () => {
  const searchParams = useSearchParams();
  const selectedFilter = searchParams.get("filter");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { posts, status, isFetchingNextPage, hasNextPage } = useInfinitePosts({
    category: "feed",
    selectedFilter,
    observerRef,
  });

  if (status === "pending") return <FeedPostsSkeleton />;

  if (status === "error") return <div>Error</div>;

  return (
    <div className="w-full h-full flex flex-col gap-10 px-7 pt-7">
      {posts?.pages.length === 0 && <div>게시물이 없습니다.</div>}
      {posts?.pages.map((group) =>
        group.map((post) => <PostBox key={post.id} post={post} />)
      )}
      <div ref={observerRef} className="h-10 flex items-center justify-center ">
        {isFetchingNextPage
          ? "로딩 중..."
          : hasNextPage
          ? "더 보기"
          : posts?.pages?.[0].length === 0
          ? ""
          : "더 이상 포스트가 없습니다."}
      </div>
    </div>
  );
};

export default PostList;

"use client";

import { useRef } from "react";

import { useSearchParams } from "next/navigation";
import { useInfinitePosts } from "@/hooks/use-infinite-posts";
import PostBox from "@/components/feed/post-box";
import { Skeleton } from "../ui/skeleton";

const PostList = () => {
  const searchParams = useSearchParams();
  const selectedFilter = searchParams.get("filter");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { posts, status, isFetchingNextPage, hasNextPage } = useInfinitePosts({
    selectedFilter,
    observerRef,
  });

  if (status === "pending")
    return (
      <div className="w-full h-full flex flex-col gap-10 px-7 pt-7">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-full h-full flex gap-10">
            <div className="flex flex-col gap-2 items-center group h-fit">
              <Skeleton className="w-[80px] h-[80px] rounded-full bg-gray-200 dark:bg-muted-foreground" />
              <Skeleton className="h-5 w-[80px] bg-gray-200 dark:bg-muted-foreground" />
            </div>
            <div className="grid grid-cols-1 w-full h-full">
              <Skeleton className="w-full max-w-[400px] aspect-square rounded-md bg-gray-200 dark:bg-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    );

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

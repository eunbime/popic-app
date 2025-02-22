"use client";

import { useRef } from "react";

import usePosts from "@/store/posts/posts-store";
import { useInfinitePosts } from "@/hooks/use-infinite-posts";
import TimelineBox from "@/components/gallery/timeline-box";
import { Skeleton } from "../ui/skeleton";

interface TimelineProps {
  userId: string;
}

const Timeline = ({ userId }: TimelineProps) => {
  const { selectedDate } = usePosts();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { posts, status, hasNextPage, isFetchingNextPage } = useInfinitePosts({
    selectedDate,
    userId,
    observerRef,
    selectedFilter: null,
  });

  if (status === "pending")
    return (
      <div className="w-full h-full flex flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-[350px] h-[430px] mx-auto mt-5 group relative cursor-pointer flex flex-col item-start gap-2"
          >
            <Skeleton className="h-7 w-[250px] bg-gray-200 dark:bg-muted-foreground" />
            <Skeleton className="w-[350px] h-[350px] bg-gray-200 dark:bg-muted-foreground" />
            <Skeleton className="h-4 w-[250px] bg-gray-200 dark:bg-muted-foreground" />
          </div>
        ))}
      </div>
    );

  if (status === "error") return <div>오류가 발생했습니다.</div>;

  return (
    <div className="w-full h-full flex flex-col">
      {posts?.pages?.[0].length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-bold text-lg text-gray-600 pt-20">
            오늘의 포스트가 없습니다.
          </p>
        </div>
      )}
      {posts?.pages.map((group) =>
        group.map((post) => (
          <TimelineBox key={post.id} post={post} userId={userId} />
        ))
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

export default Timeline;

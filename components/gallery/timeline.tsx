"use client";

import { useRef } from "react";

import usePosts from "@/store/posts/posts-store";
import { useInfinitePosts } from "@/hooks/posts/useInfinitePosts";
import TimelineBox from "@/components/gallery/timeline-box";
import TimelineSkeleton from "@/components/skeleton/timeline-skeleton";

interface TimelineProps {
  userId: string;
}

const Timeline = ({ userId }: TimelineProps) => {
  const { selectedDate } = usePosts();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { posts, status, hasNextPage, isFetchingNextPage } = useInfinitePosts({
    category: "timeline",
    selectedDate,
    userId,
    observerRef,
    selectedFilter: null,
  });

  if (status === "pending") return <TimelineSkeleton />;

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

"use client";

import { useRef } from "react";

import usePosts from "@/store/posts/posts-store";
import { useInfinitePosts } from "@/hooks/use-infinite-posts";
import TimelineBox from "@/components/gallery/timeline-box";

interface TimelineProps {
  userId: string;
}

// 1. switch 변경 -> 수정 버튼 클릭 -> api/posts/[postId] -> auth 체크 -> findUnique -> 수정 -> invalidateQueries({queryKey: ["posts"]}) -> 데이터 새로 요청 ->
// 낙관적 업데이트
//
const Timeline = ({ userId }: TimelineProps) => {
  const { selectedDate } = usePosts();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { posts, status, hasNextPage, isFetchingNextPage } = useInfinitePosts({
    selectedDate,
    userId,
    observerRef,
    selectedFilter: null,
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex justify-center items-center p-10">
        {posts?.pages?.[0].length === 0 && (
          <div className="font-bold text-lg text-gray-600">
            오늘의 포스트가 없습니다.
          </div>
        )}
      </div>
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

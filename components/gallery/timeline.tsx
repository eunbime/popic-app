"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { TPostWithLikes } from "@/types";
import { getPostsByDate } from "@/api/posts";
import usePosts from "@/store/posts/posts-store";
import TimelineBox from "@/components/gallery/timeline-box";

interface TimelineProps {
  userId: string;
}

const POSTS_PER_PAGE = 5;

const Timeline = ({ userId }: TimelineProps) => {
  const { selectedDate } = usePosts();
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data: postsByDate,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts-by-date", selectedDate],
    queryFn: ({ pageParam = 1 }) =>
      getPostsByDate(selectedDate, userId, pageParam, POSTS_PER_PAGE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined;
      return allPages.length + 1;
    },
    enabled: !!selectedDate,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <div className="w-full h-full flex flex-col">
      {postsByDate.pages.map((group, i) =>
        group.map((post: TPostWithLikes) => (
          <TimelineBox key={post.id} post={post} userId={userId} />
        ))
      )}

      <div ref={observerRef} className="h-10 flex items-center justify-center ">
        {isFetchingNextPage
          ? "로딩 중..."
          : hasNextPage
          ? "더 보기"
          : "더 이상 포스트가 없습니다."}
      </div>
    </div>
  );
};

export default Timeline;

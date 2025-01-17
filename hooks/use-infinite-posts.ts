import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { TPostsWithAuthorAndLikes } from "@/types";
import { getFeedPosts, getPostsByDate } from "@/api/posts";

const POSTS_PER_PAGE = 5;

interface UseInfinitePostsProps {
  selectedDate?: Date | null;
  selectedFilter?: string | null;
  userId?: string | null;
  observerRef: React.RefObject<HTMLDivElement | null>;
}

export const useInfinitePosts = ({
  selectedDate,
  selectedFilter,
  userId,
  observerRef,
}: UseInfinitePostsProps) => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<TPostsWithAuthorAndLikes[]>({
    queryKey: ["posts", selectedDate || selectedFilter],
    queryFn: async ({ pageParam = 1 }) => {
      if (selectedDate) {
        return getPostsByDate(
          selectedDate,
          userId,
          pageParam as number,
          POSTS_PER_PAGE
        );
      }
      return getFeedPosts(selectedFilter, pageParam as number, POSTS_PER_PAGE);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined;
      return allPages.length + 1;
    },
    enabled: !!selectedDate || !!selectedFilter,
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

  return {
    posts,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

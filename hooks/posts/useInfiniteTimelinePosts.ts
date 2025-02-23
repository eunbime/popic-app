import { QueryClient } from "@tanstack/react-query";

import { TPostsWithAuthorAndLikes } from "@/types";
import { getPostsByDate } from "@/api/posts";

export const prefetchInfiniteTimelinePosts = async (
  userId: string,
  date: Date,
  queryClient: QueryClient
) => {
  try {
    queryClient.prefetchInfiniteQuery<TPostsWithAuthorAndLikes[]>({
      queryKey: ["posts", "timeline", date],
      queryFn: async ({ pageParam = 1 }) => {
        return getPostsByDate(date, userId, pageParam as number, 5);
      },
      initialPageParam: 1,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to prefetch timeline posts");
  }
};

import { getPostsByDate } from "@/api/posts";
import { TPostsWithAuthorAndLikes } from "@/types";
import { QueryClient } from "@tanstack/react-query";

export const prefetchFeedPosts = async (
  date: Date,
  userId: string,
  queryClient: QueryClient
) => {
  try {
    return queryClient.prefetchInfiniteQuery<TPostsWithAuthorAndLikes[]>({
      queryKey: ["posts", "feed", "all"],
      queryFn: async ({ pageParam = 1 }) => {
        return getPostsByDate(date, userId, pageParam as number, 5);
      },
      initialPageParam: 1,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch user");
  }
};

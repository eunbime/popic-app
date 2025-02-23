import { getLikePosts } from "@/api/posts";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const prefetchListPosts = async (queryClient: QueryClient) => {
  try {
    return queryClient.prefetchQuery({
      queryKey: ["posts", "like", "all"],
      queryFn: () => getLikePosts("all"),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch user");
  }
};

export const useLikePosts = (filter: string) => {
  try {
    return useQuery({
      queryKey: ["posts", "like", filter],
      queryFn: () => getLikePosts(filter),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch user");
  }
};

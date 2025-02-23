import { getPostsByUserId } from "@/api/posts";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const prefetchPostsByUserId = async (
  userId: string,
  queryClient: QueryClient
) => {
  try {
    queryClient.prefetchQuery({
      queryKey: ["posts", userId],
      queryFn: () => getPostsByUserId(userId),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to prefetch posts by user id");
  }
};

export const usePostsByUserId = (userId?: string) => {
  try {
    return useQuery({
      queryKey: ["posts", userId],
      queryFn: () => getPostsByUserId(userId),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch posts by user id");
  }
};

import { getDateGroupsByUserId } from "@/api/posts";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";

export const prefetchCarouselPosts = async (
  userId: string,
  queryClient: QueryClient
) => {
  try {
    return queryClient.prefetchInfiniteQuery({
      queryKey: ["post-dates", userId],
      queryFn: async () => {
        return await getDateGroupsByUserId(userId);
      },
      initialPageParam: undefined,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch posts");
  }
};

export const useInfiniteCarouselPosts = (userId: string) => {
  try {
    return useInfiniteQuery({
      queryKey: ["post-dates", userId],
      queryFn: async ({ pageParam }: { pageParam: Date | undefined }) => {
        const result = await getDateGroupsByUserId(userId, pageParam);
        return result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        const oldestDate = lastPage[0].date; // 첫 번째 항목이 가장 오래된 날짜
        return new Date(oldestDate);
      },
      initialPageParam: undefined,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch posts");
  }
};

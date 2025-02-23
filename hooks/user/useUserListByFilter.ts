import { getSearchUserList } from "@/api/user";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUserListByFilter = (keyword: string, order: string) => {
  try {
    return useInfiniteQuery({
      queryKey: ["users", "search", keyword, order],
      queryFn: () => getSearchUserList(keyword, 10, 0, order),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === 10 ? pages.length * 10 : undefined;
      },
      initialPageParam: 0,
      enabled: !!keyword,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch user list by filter");
  }
};

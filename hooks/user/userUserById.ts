import { QueryClient, useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/user";

export const prefetchUserById = async (
  userId: string,
  queryClient: QueryClient
) => {
  try {
    return queryClient.prefetchQuery({
      queryKey: ["user", userId],
      queryFn: () => getUserById(userId),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Internal server error");
  }
};

export const useUserById = (userId: string) => {
  try {
    return useQuery({
      queryKey: ["user", userId],
      queryFn: () => getUserById(userId),
      enabled: !!userId,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Internal server error");
  }
};

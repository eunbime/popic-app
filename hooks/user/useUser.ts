import { getUser } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  try {
    return useQuery({
      queryKey: ["user"],
      queryFn: getUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch user");
  }
};

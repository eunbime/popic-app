"use client";

import { getSearchUserList } from "@/api/user";
import { User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import UserAvatar from "../common/user-avatar";
import { useRouter } from "next/navigation";

interface SearchUserListProps {
  keyword: string;
  order: string;
}

const SearchUserList = ({ keyword, order }: SearchUserListProps) => {
  const router = useRouter();

  const { data } = useInfiniteQuery({
    queryKey: ["search-user-list", keyword, order],
    queryFn: () => getSearchUserList(keyword, 10, 0, order),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length * 10 : undefined;
    },
    initialPageParam: 0,
    enabled: !!keyword,
  });

  const handleUserClick = (userId: string) => {
    router.push(`/gallery/${userId}`);
  };

  return (
    <div className="w-[80%]">
      {data?.pages.map((page: User[], index: number) => (
        <div key={index} className="flex flex-col gap-3">
          {page.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-md hover:bg-gray-800 transition-all duration-300 cursor-pointer"
              onClick={() => handleUserClick(user.id)}
            >
              <UserAvatar image={user.image as string} />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SearchUserList;

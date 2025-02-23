"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import { useUserListByFilter } from "@/hooks/user/useUserListByFilter";
import UserAvatar from "@/components/common/user-avatar";

interface SearchUserListProps {
  keyword: string;
  order: string;
}

const SearchUserList = ({ keyword, order }: SearchUserListProps) => {
  const router = useRouter();

  const { data } = useUserListByFilter(keyword, order);

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

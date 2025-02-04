"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (filter: string) => {
    router.push(`/search?filter=${filter}`);
  };

  return (
    <div className="flex items-center gap-5 text-xs">
      <div className="flex flex-1 gap-5">
        <button
          className={cn(
            "bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-2 flex-1",
            searchParams.get("filter") === "user" &&
              "bg-gray-500 dark:bg-gray-500"
          )}
          onClick={() => handleFilter("user")}
        >
          유저
        </button>
        <button
          className={cn(
            "bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-2 flex-1",
            searchParams.get("filter") === "post" &&
              "bg-gray-500 dark:bg-gray-500"
          )}
          onClick={() => handleFilter("post")}
        >
          포스트
        </button>
      </div>
      <div className="relative">
        <Select defaultValue="latest">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="최신순" />
          </SelectTrigger>
          <SelectContent
            className="w-[100px] z-50"
            position="popper"
            side="bottom"
            align="end"
          >
            <SelectGroup>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="oldest">오래된순</SelectItem>
              <SelectItem value="popular">인기순</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;

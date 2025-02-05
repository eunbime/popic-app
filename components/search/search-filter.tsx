"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface SearchFilterProps {
  setOrder: (order: string) => void;
  order: string;
}

const SearchFilter = ({ setOrder, order }: SearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFilter = (filter: string) => {
    router.push(`/search?filter=${filter}`);
  };

  return (
    <div className="flex items-center gap-5 text-xs">
      <div className="flex flex-1 gap-5">
        <button
          className={cn(
            "bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-2 flex-1",
            searchParams.get("filter") === "post" &&
              "bg-gray-400 dark:bg-gray-500"
          )}
          onClick={() => handleFilter("post")}
        >
          포스트
        </button>
        <button
          className={cn(
            "bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-2 flex-1",
            searchParams.get("filter") === "user" &&
              "bg-gray-400 dark:bg-gray-500"
          )}
          onClick={() => handleFilter("user")}
        >
          유저
        </button>
      </div>
      <div className="relative z-10 w-[100px]" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-xs text-left flex justify-between items-center"
        >
          {order === "desc" ? "최신순" : "오래된순"}
          <span>▼</span>
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg overflow-hidden">
            <button
              className="w-full px-3 py-2 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => {
                setOrder("desc");
                setIsOpen(false);
              }}
            >
              최신순
            </button>
            <button
              className="w-full px-3 py-2 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => {
                setOrder("asc");
                setIsOpen(false);
              }}
            >
              오래된순
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;

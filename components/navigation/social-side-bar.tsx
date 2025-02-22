"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

const SocialSideBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pathnameWithoutQuery = pathname.split("?")[0];

  const isActive = (path: string) => searchParams.get("filter") === path;

  return (
    <div className="!flex-col !hidden md:!block w-[150px] h-full min-h-screen py-5">
      <div className="flex flex-col gap-2">
        <Link
          href={`${pathnameWithoutQuery}?filter=all`}
          className={cn(
            "w-[100px] h-fit rounded-lg p-2 mt-5 bg-gray-100 dark:bg-gray-800 hover:bg-main-blue dark:hover:bg-main-blue transition-all duration-300",
            isActive("all") && "bg-main-blue dark:bg-main-blue"
          )}
        >
          <p className="font-semibold text-center">전체</p>
        </Link>
        <Link
          href={`${pathnameWithoutQuery}?filter=following`}
          className={cn(
            "w-[100px] h-fit rounded-lg p-2 mt-5 bg-gray-100 dark:bg-gray-800 hover:bg-main-blue dark:hover:bg-main-blue transition-all duration-300",
            isActive("following") && "bg-main-blue dark:bg-main-blue"
          )}
        >
          <p className="font-semibold text-center">팔로잉</p>
        </Link>
      </div>
    </div>
  );
};

export default SocialSideBar;

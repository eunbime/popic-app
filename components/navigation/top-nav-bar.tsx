"use client";

import { cn } from "@/lib/utils";
import useUser from "@/store/user/user-store.";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopNavBar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const selectUserId = pathname.split("/")[2];

  const isGallery = pathname.includes("/gallery");
  const isCalendar = pathname.includes("/calendar");
  const isFollow =
    pathname.includes("/follower") || pathname.includes("/following");

  if (isFollow) {
    return null;
  }

  if (selectUserId !== user?.id) {
    return null;
  }

  return (
    <div className="w-full h-[30px] flex justify-center items-center gap-20 mt-3">
      <Link
        href={`/gallery/${user?.id}`}
        className={cn(
          "flex justify-center items-center bg-gray-200 text-black px-7 rounded-full py-1",
          isGallery && "bg-gray-400"
        )}
      >
        갤러리
      </Link>
      <Link
        href={`/calendar/${user?.id}`}
        className={cn(
          "flex justify-center items-center bg-gray-200 text-black px-7 rounded-full py-1",
          isCalendar && "bg-gray-400"
        )}
      >
        캘린더
      </Link>
    </div>
  );
};

export default TopNavBar;

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NAV_ITEMS = [
  { href: "all", label: "전체" },
  { href: "following", label: "팔로잉" },
] as const;

const SocialNavBar = () => {
  const pathname = usePathname();
  const path = pathname.includes("/social/feed")
    ? "/social/feed"
    : "/social/like";
  const query = useSearchParams();
  const filter = query.get("filter");

  return (
    <nav className="w-full h-[30px] flex justify-center items-center gap-20 mt-3">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={`${path}/?filter=${item.href}`}
          className={cn(
            "flex justify-center items-center bg-gray-200 text-black px-7 rounded-full py-1 hover:opacity-80 transition-opacity duration-300",
            filter === item.href && "bg-gray-400"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default SocialNavBar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const SideBarList = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  const hrefWithoutQuery = href.split("?")[0];

  const isActive = pathname.split("?")[0] === hrefWithoutQuery;

  return (
    <li
      className={cn(
        "hover:text-main-blue transition-all duration-300",
        isActive && "text-main-blue"
      )}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default SideBarList;

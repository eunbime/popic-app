"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FollowNav = () => {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];

  return (
    <div className="w-full flex justify-center items-center py-5 gap-[150px]">
      <Link href={`/gallery/${userId}/follower`}>
        <span>팔로워</span>
      </Link>
      <Link href={`/gallery/${userId}/following`}>
        <span>팔로잉</span>
      </Link>
    </div>
  );
};

export default FollowNav;

"use client";

import { usePathname, useRouter } from "next/navigation";

const SocialNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (query: string) => {
    router.push(`${pathname}?filter=${query}`);
  };

  return (
    <div className="w-full h-[30px]  flex justify-center items-center border-t">
      <div
        onClick={() => handleClick("all")}
        className="flex flex-1 justify-center items-center border-r cursor-pointer"
      >
        All
      </div>
      <div
        onClick={() => handleClick("follow")}
        className="flex flex-1 justify-center items-center cursor-pointer"
      >
        Follow
      </div>
    </div>
  );
};

export default SocialNavBar;

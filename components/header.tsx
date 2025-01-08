"use client";

import { usePathname, useRouter } from "next/navigation";
import { IoSettings } from "react-icons/io5";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  const isAuth = ["/", "/auth/login", "/auth/register"].includes(pathname);
  const isHome = ["/gallery", "/calendar"].includes(pathname);
  const isFeed = pathname === "/social/feed";
  const isLike = pathname === "/social/like";
  const isSettings = pathname === "/settings";

  if (isAuth) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-[50px]">
      <div className="max-w-[430px] mx-auto h-full bg-white dark:bg-gray-900 flex justify-between items-center px-5 border-b border-gray-200">
        <div className="flex justify-center items-center">
          <p onClick={() => handleClick(pathname)} className="cursor-pointer">
            {isHome
              ? "Home"
              : isFeed
              ? "Feed"
              : isLike
              ? "Like"
              : isSettings
              ? "Settings"
              : ""}
          </p>
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          <IoSettings size={30} onClick={() => handleClick("/settings")} />
        </div>
      </div>
    </div>
  );
};

export default Header;

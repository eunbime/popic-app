"use client";

import { usePathname, useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = ["/", "/auth/login", "/auth/register"].includes(pathname);
  const isHome = ["/gallery", "/calendar"].includes(pathname);
  const isFeed = pathname === "/social/feed";
  const isLike = pathname === "/social/like";
  const isSettings = pathname === "/settings";

  const handleClick = (path: string) => {
    if (isHome || isFeed || isLike || isSettings) {
      router.push(path);
    } else {
      router.back();
    }
  };

  if (isAuth) {
    return null;
  }

  return (
    <div className="fixed z-10 top-0 left-0 w-full h-[50px]">
      <div className="max-w-[430px] mx-auto h-full bg-white dark:bg-gray-900 text-black dark:text-white flex justify-between items-center px-5 border-b border-gray-200">
        <div className="flex justify-center items-center">
          <p onClick={() => handleClick(pathname)} className="cursor-pointer">
            {isHome ? (
              "Home"
            ) : isFeed ? (
              "Feed"
            ) : isLike ? (
              "Like"
            ) : isSettings ? (
              "Settings"
            ) : (
              <BiArrowBack size={20} />
            )}
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

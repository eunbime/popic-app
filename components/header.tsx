"use client";

import useUser from "@/store/user/user-store.";
import { usePathname, useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { IoSearch, IoSettings } from "react-icons/io5";

const Header = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = ["/", "/auth/login", "/auth/register"].includes(pathname);
  const isHome = [`/gallery/${user?.id}`, `/calendar/${user?.id}`].includes(
    pathname
  );
  const isFeed = pathname === "/social/feed";
  const isLike = pathname === "/social/like";
  const isSettings = pathname === "/settings";
  const isFollow = pathname.includes("/follow");
  const isSearch = pathname.includes("/search");

  const handleClick = (path: string) => {
    if (isHome || isFeed || isLike || isSettings) {
      router.push(path);
    } else if (isFollow) {
      router.push(`/gallery/${user?.id}`);
    } else if (isSearch) {
      router.push("/social/feed?filter=all");
    } else {
      router.back();
    }
  };

  if (isAuth) {
    return null;
  }

  return (
    <div className="fixed md:hidden z-10 top-0 left-0 w-full h-[50px] border-b border-gray-200 bg-white dark:bg-dark-gray text-black dark:text-white dark:border-gray-800 px-5 ">
      <div className="max-w-6xl mx-auto h-full  flex justify-between items-center">
        <div className="flex justify-center items-center">
          <p
            onClick={() => handleClick(pathname)}
            className="cursor-pointer font-semibold"
          >
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
        <div className="flex justify-center items-center gap-5 cursor-pointer">
          {isFeed && (
            <IoSearch
              size={30}
              onClick={() => handleClick("/search?filter=post")}
            />
          )}
          <IoSettings size={30} onClick={() => handleClick("/settings")} />
        </div>
      </div>
    </div>
  );
};

export default Header;

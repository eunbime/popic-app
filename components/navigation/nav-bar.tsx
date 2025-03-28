"use client";

import useUser from "@/store/user/user-store.";
import { usePathname, useRouter } from "next/navigation";
import { IoHeart, IoHome, IoPeople } from "react-icons/io5";

const NavBar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  const isAuth = ["/", "/auth/login", "/auth/register"].includes(pathname);

  if (isAuth) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-[70px] md:hidden px-10 pb-5 border-gray-200 bg-white dark:bg-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
      <div className="max-w-md mx-auto h-full flex justify-between items-center ">
        <div className="w-[50px] h-[50px] text-black flex justify-center items-center cursor-pointer">
          <IoHome
            size={30}
            onClick={() => handleClick(`/gallery/${user?.id}`)}
          />
        </div>
        <div className="w-[50px] h-[50px] text-black flex justify-center items-center cursor-pointer">
          <IoPeople
            size={30}
            onClick={() => handleClick("/social/feed/?filter=all")}
          />
        </div>
        <div className="w-[50px] h-[50px] text-black flex justify-center items-center cursor-pointer">
          <IoHeart
            size={30}
            onClick={() => handleClick("/social/like/?filter=all")}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

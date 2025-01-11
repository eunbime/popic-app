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
    <div className="fixed bottom-0 left-0 w-full h-[50px]">
      <div className="max-w-[430px] mx-auto h-full flex justify-between items-center px-10 border-gray-200 bg-white dark:bg-gray-800 shadow-md shadow-gray-500 dark:shadow-gray-800">
        <div className="w-[50px] h-[50px] text-black flex justify-center items-center cursor-pointer">
          <IoHome
            size={30}
            onClick={() => handleClick(`/gallery/${user?.id}`)}
          />
        </div>
        <div className="w-[50px] h-[50px] text-black flex justify-center items-center cursor-pointer">
          <IoPeople size={30} onClick={() => handleClick("/social/feed")} />
        </div>
        <div className="w-[50px] h-[50px] text-black flex justify-center items-center cursor-pointer">
          <IoHeart size={30} onClick={() => handleClick("/social/like")} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

"use client";

import { useRouter } from "next/navigation";
import { IoHeart, IoHome, IoPeople } from "react-icons/io5";

const NavBar = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-[50px]">
      <div className="max-w-[490px] mx-auto h-full flex justify-between items-center px-10 bg-white">
        <div className="w-[50px] h-[50px] text-black flex justify-center items-center cursor-pointer">
          <IoHome size={30} onClick={() => handleClick("/")} />
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

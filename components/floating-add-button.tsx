"use client";

import useModal from "@/store/modal/modal-store";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

const FloatingAddButton = () => {
  const { openModal, setType, setData } = useModal();

  const pathname = usePathname();
  const isValidPath = ["/gallery", "/feed", "/like", "/calendar"].some((path) =>
    pathname.includes(path)
  );

  const handleOpenModal = () => {
    setType("post-upload");
    setData({
      post: null,
      formData: null,
      title: "",
      description: "",
      onConfirm: null,
    });
    openModal();
  };

  if (!isValidPath) {
    return null;
  }

  return (
    <div className="z-20 fixed bottom-[90px] md:bottom-[50px] right-[20px]">
      <button
        onClick={handleOpenModal}
        className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-main-blue shadow-sm shadow-gray-500 dark:shadow-gray-800 hover:opacity-80 transition-all duration-300"
      >
        <Plus />
      </button>
    </div>
  );
};

export default FloatingAddButton;

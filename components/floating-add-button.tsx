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
    <div className="fixed bottom-[90px] w-full flex justify-center">
      <div className="relative w-full max-w-[590px]">
        <button
          onClick={handleOpenModal}
          className="fixed flex items-center justify-center z-20 bottom-[90px] right-[20px] sm:right-[calc(50%-200px)] w-[50px] h-[50px] rounded-full dark:bg-gray-300 bg-gray-300 shadow-sm shadow-gray-500 dark:shadow-gray-800 hover:opacity-80 transition-all duration-300"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default FloatingAddButton;

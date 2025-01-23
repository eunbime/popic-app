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
    <button
      onClick={handleOpenModal}
      className="fixed flex items-center justify-center z-20 bottom-[70px] right-[10px] md:right-[190px] lg:right-[320px] xl:right-[590px] w-[50px] h-[50px] rounded-full bg-gray-300 mr-3 shadow-sm shadow-gray-800 hover:opacity-80"
    >
      <Plus />
    </button>
  );
};

export default FloatingAddButton;

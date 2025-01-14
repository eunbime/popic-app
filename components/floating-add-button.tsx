"use client";

import useModal from "@/store/modal/modal-store";
import { Plus } from "lucide-react";

const FloatingAddButton = () => {
  const { openModal, setType } = useModal();

  const handleOpenModal = () => {
    setType("post-upload");
    openModal();
  };

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

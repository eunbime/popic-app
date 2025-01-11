"use client";

import useModal from "@/store/modal/modal-store";

const FloatingAddButton = () => {
  const { openModal, setType } = useModal();

  const handleOpenModal = () => {
    setType("post-upload");
    openModal();
  };

  return (
    <button
      onClick={handleOpenModal}
      className="fixed z-20 bottom-[70px] right-[70px] w-[50px] h-[50px] rounded-full bg-gray-400 mr-3"
    >
      +
    </button>
  );
};

export default FloatingAddButton;

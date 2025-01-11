"use client";

import useModal from "@/store/modal/modal-store";
import Carousel from "./carousel";

interface CarouselBoxProps {
  userId: string;
}

const CarouselBox = ({ userId }: CarouselBoxProps) => {
  const { openModal, setType } = useModal();

  const handleOpenModal = () => {
    setType("post-upload");
    openModal();
  };

  return (
    <div className="flex w-full h-[100px] justify-between">
      <Carousel userId={userId} />
      <button
        onClick={handleOpenModal}
        className="w-[80px] h-full rounded-md bg-gray-500 mr-3"
      >
        +
      </button>
    </div>
  );
};

export default CarouselBox;

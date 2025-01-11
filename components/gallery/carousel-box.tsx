"use client";

import Carousel from "./carousel";

interface CarouselBoxProps {
  userId: string;
}

const CarouselBox = ({ userId }: CarouselBoxProps) => {
  return (
    <div className="flex w-full h-[100px] justify-between">
      <Carousel userId={userId} />
    </div>
  );
};

export default CarouselBox;

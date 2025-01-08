"use client";

import Carousel from "./carousel";

const CarouselBox = () => {
  return (
    <div className="flex w-full h-[100px] justify-between">
      <Carousel />
      <button className="w-[80px] h-full rounded-md bg-gray-500 mr-3">+</button>
    </div>
  );
};

export default CarouselBox;

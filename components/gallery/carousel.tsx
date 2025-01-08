"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";
import { useRef } from "react";

const Carousel = () => {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="relative group w-[350px] h-full px-3">
      <Swiper
        modules={[Navigation, Pagination]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={15}
        slidesPerView={3}
        initialSlide={6}
        mousewheel={true}
        autoplay={false}
        navigation={false}
        className="h-full w-full"
      >
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-200">
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-300">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-400">
            Slide 3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-400">
            Slide 4
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-400">
            Slide 5
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-400">
            Slide 6
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gray-400">
            Slide 7
          </div>
        </SwiperSlide>
      </Swiper>
      {/* 커스텀 화살표 */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 
                   w-10 h-10 flex items-center justify-center 
                   bg-white/50 rounded-full 
                   hover:bg-white/80"
      >
        ←
      </button>
    </div>
  );
};

export default Carousel;

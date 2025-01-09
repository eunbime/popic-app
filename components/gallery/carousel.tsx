"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDateGroups } from "@/api/posts";
import CarouselCard from "./carousel-card";
import usePosts from "@/store/posts/posts-store";

const Carousel = () => {
  const swiperRef = useRef<SwiperType>(null);
  const { selectedDate, setSelectedDate } = usePosts();

  const { data: dateGroups } = useQuery({
    queryKey: ["post-dates"],
    queryFn: () => getDateGroups(),
  });

  return (
    <div className="relative group w-[350px] h-full px-3">
      <Swiper
        key={selectedDate?.toISOString()}
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
        {dateGroups?.map((dateGroup) => (
          <SwiperSlide key={dateGroup.date.toString()}>
            <CarouselCard
              date={new Date(dateGroup.date)}
              count={dateGroup.count}
              onClick={() => setSelectedDate(new Date(dateGroup.date))}
              thumbnailUrl={dateGroup.thumbnailUrl}
            />
          </SwiperSlide>
        ))}
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

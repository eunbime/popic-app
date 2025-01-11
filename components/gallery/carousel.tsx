"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDateGroupsByUserId } from "@/api/posts";
import CarouselCard from "./carousel-card";
import usePosts from "@/store/posts/posts-store";
import { cn } from "@/lib/utils";

interface CarouselProps {
  userId: string;
}

const Carousel = ({ userId }: CarouselProps) => {
  const swiperRef = useRef<SwiperType>(null);
  const { selectedDate, setSelectedDate } = usePosts();

  const { data: dateGroups } = useQuery({
    queryKey: ["post-dates"],
    queryFn: () => getDateGroupsByUserId(userId),
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

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/50 rounded-full hover:bg-white/80",
          dateGroups?.length && dateGroups?.length < 4 && "opacity-0"
        )}
        disabled={dateGroups && dateGroups.length < 4}
      >
        ←
      </button>
    </div>
  );
};

export default Carousel;

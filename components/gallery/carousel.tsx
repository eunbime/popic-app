"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CarouselCard from "./carousel-card";
import usePosts from "@/store/posts/posts-store";
import { getDateGroupsByUserId } from "@/api/posts";

interface CarouselProps {
  userId: string;
}

const Carousel = ({ userId }: CarouselProps) => {
  const swiperRef = useRef<SwiperType>(null);
  const { selectedDate, setSelectedDate } = usePosts();
  const [isLoading, setIsLoading] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["date-groups", userId],
      queryFn: async ({ pageParam = new Date() }) => {
        const result = await getDateGroupsByUserId(userId, pageParam);
        return result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        const oldestDate = lastPage[0].date; // 첫 번째 항목이 가장 오래된 날짜
        return new Date(oldestDate);
      },
      initialPageParam: new Date(),
    });

  const allGroups = useMemo(() => {
    // 각 페이지의 데이터를 역순으로 합치기
    return (
      data?.pages.reduce((acc, page) => {
        return [...page, ...acc];
      }, []) ?? []
    );
  }, [data?.pages]);

  const handleLoadMore = async () => {
    if (isLoading || isFetchingNextPage || !hasNextPage) return;
    setIsLoading(true);
    try {
      // const currentIndex = swiperRef.current?.activeIndex ?? 0;
      await fetchNextPage();
      // 새로운 데이터가 로드된 후 현재 슬라이드 위치 조정
      // setTimeout(() => {
      //   if (swiperRef.current) {
      //     swiperRef.current.slideTo(currentIndex + 3, 0);
      //   }
      // }, 0);
    } catch (error) {
      console.error("Failed to load more dates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();

      // 왼쪽(이전 데이터)으로 이동할 때 추가 데이터 로드
      const swiper = swiperRef.current;
      const isNearStart = swiper.isBeginning || swiper.activeIndex <= 2;

      if (isNearStart && hasNextPage) {
        handleLoadMore();
      } else {
        swiper.slidePrev();
      }
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="relative w-full h-[80px] mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={15}
        slidesPerView={4}
        initialSlide={allGroups.length - 1}
        className="h-full px-10 pb-10 w-[calc(100%-80px)]"
      >
        {(isFetchingNextPage || isLoading) && (
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </SwiperSlide>
        )}
        {allGroups.map((dateGroup, index) => (
          <SwiperSlide key={`${dateGroup.date}-${index}`}>
            <CarouselCard
              date={new Date(dateGroup.date)}
              count={dateGroup.count}
              onClick={() => handleSlideClick(new Date(dateGroup.date))}
              thumbnailUrl={dateGroup.thumbnailUrl}
              isSelected={
                selectedDate?.toDateString() ===
                new Date(dateGroup.date).toDateString()
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {data?.pages && data.pages?.[0].length > 0 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white text-black rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading || isFetchingNextPage}
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white text-black rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
          >
            →
          </button>

          <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2 pb-2">
            {Array.from({ length: Math.ceil(allGroups.length / 4) }).map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i * 4)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor((swiperRef.current?.activeIndex ?? 0) / 4) === i
                      ? "bg-gray-800"
                      : "bg-gray-300 hover:bg-gray-500"
                  }`}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;

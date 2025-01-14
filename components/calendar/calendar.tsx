"use client";

import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
  Button,
} from "react-aria-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDate } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";

import { Post } from "@prisma/client";
import { getPosts } from "@/api/posts";
import { formatDate, formatDateForCalendar } from "@/lib/formatDate";

interface CustomCalendarProps {
  setSelectedDateForPost: (date: Date | null) => void;
}

export default function CustomCalendar({
  setSelectedDateForPost,
}: CustomCalendarProps) {
  const { data: posts } = useQuery<Post[]>({
    queryKey: ["postList"],
    queryFn: () => getPosts(),
  });

  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  useEffect(() => {
    const selectedDateForPost = selectedDate
      ? new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)
      : null;
    setSelectedDateForPost(selectedDateForPost);
  }, [selectedDate, setSelectedDateForPost]);

  // 날짜에 해당하는 이벤트 찾기
  const getEventForDate = (date: CalendarDate) => {
    const dateStr = formatDate(date);
    return posts?.find(
      (event) => formatDateForCalendar(event.date) === dateStr
    );
  };

  return (
    <Calendar
      aria-label="날짜 선택"
      value={selectedDate}
      onChange={setSelectedDate}
      className="w-full mt-5 p-4"
    >
      <header className="flex items-center justify-between px-4 py-2">
        <Button slot="previous">이전</Button>
        <Heading />
        <Button slot="next">다음</Button>
      </header>
      <CalendarGrid className="w-full">
        {(date) => {
          const event = getEventForDate(date);

          return (
            <CalendarCell
              date={date}
              className={({ isSelected, isDisabled }) => `
                p-2 text-center rounded-lg h-[80px] w-[50px] relative
                ${isSelected ? "bg-blue-600 text-white" : ""}
                ${isDisabled ? "text-gray-400" : ""}
                hover:bg-blue-100
              `}
            >
              {({ formattedDate }) => (
                <div className="flex flex-col h-full">
                  <span className="absolute top-1 left-1">{formattedDate}</span>
                  {event && (
                    <div className="mt-6">
                      <div className="relative w-full h-[40px]">
                        <Image
                          src={event.imageUrl || ""}
                          alt={event.title || "Calendar event"}
                          className="object-cover rounded"
                          fill
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CalendarCell>
          );
        }}
      </CalendarGrid>
    </Calendar>
  );
}

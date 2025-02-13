"use client";

import CustomCalendar from "@/components/calendar/calendar";
import CalendarPostList from "@/components/calendar/calendar-post-list";
import { useState } from "react";

export default function CalendarComponent() {
  const [selectedDateForPost, setSelectedDateForPost] = useState<Date | null>(
    null
  );

  return (
    <div className="w-full h-full">
      <CustomCalendar setSelectedDateForPost={setSelectedDateForPost} />
      <CalendarPostList selectedDateForPost={selectedDateForPost} />
    </div>
  );
}

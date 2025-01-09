import { CalendarDate } from "@internationalized/date";
import { format } from "date-fns";

export const formatDate = (date: CalendarDate) => {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(
    date.day
  ).padStart(2, "0")}`;
};

export const formatDateForTimeline = (date: Date) => {
  return format(date, "yyyy.MM.dd");
};

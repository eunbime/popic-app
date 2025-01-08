import { CalendarDate } from "@internationalized/date";

export const formatDate = (date: CalendarDate) => {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(
    date.day
  ).padStart(2, "0")}`;
};

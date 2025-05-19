import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { engMonthToBanglaFuzzy, engNumberToBanglaNumber } from "@/lib/helpers";

export default function MonthSwitcher({
  setSelectDate,
}: {
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [direction, setDirection] = useState<"left" | "right">("right");
  console.log(direction);

  const handlePreviousMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prevMonth);
    setDirection("left");
    setSelectDate(prevMonth);
  };
  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    const isFuture =
      nextMonth.getFullYear() > today.getFullYear() ||
      (nextMonth.getFullYear() === today.getFullYear() &&
        nextMonth.getMonth() > today.getMonth());
    if (!isFuture) {
      setCurrentDate(nextMonth);
      setDirection("right");
      setSelectDate(nextMonth);
    }
  };
  const getMonthYear = (date: Date) => {
    return {
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
    };
  };
  const isCurrentMonth = (date: Date, today: Date) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  };
  const { month, year } = getMonthYear(currentDate);

  return (
    <div className="flex items-center justify-between">
      <Button variant={"outline"} size={"icon"} onClick={handlePreviousMonth}>
        <LucideChevronLeft />
      </Button>
      <div className="text-center space-x-2 font-medium text-lg">
        <span className="uppercase">{engMonthToBanglaFuzzy(month)}</span>
        <span>{engNumberToBanglaNumber(year)}</span>
      </div>
      <Button
        disabled={isCurrentMonth(currentDate, today)}
        size={"icon"}
        variant={"outline"}
        onClick={handleNextMonth}
      >
        <LucideChevronRight />
      </Button>
    </div>
  );
}

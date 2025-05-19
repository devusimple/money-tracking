import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMonthYear(date: Date) {
  return {
    month: date.toLocaleString("default", { month: "long" }),
    year: date.getFullYear(),
  };
}

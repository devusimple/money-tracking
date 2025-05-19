import {
  engCategoryToBanglaFuzzy,
  engMonthToBanglaFuzzy,
  engNumberToBanglaNumber,
} from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Record } from "@/types";
import { format } from "date-fns";
import { LucideTrendingDown, LucideTrendingUp } from "lucide-react";

export default function RecordCard({ record }: { record: Record }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3",
        record.type == "Expense" && "bg-red-50",
        record.type == "Income" && "bg-green-50"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="bg-white border w-10 h-10 rounded-full grid place-content-center">
          {record.type == "Income" ? (
            <LucideTrendingUp className="text-green-500" />
          ) : (
            <LucideTrendingDown className="text-red-500 " />
          )}
        </div>
        <div className="">
          <h2 className="text-lg font-semibold">
            {engCategoryToBanglaFuzzy(record.category)}
          </h2>
          <p className="text-sm">
            {record.description.slice(0, 25)}
            {record.description.length > 25 && <span>...</span>}
          </p>
        </div>
      </div>
      <div className="text-right">
        <h2
          className={cn(
            "text-lg font-semibold",
            record.type == "Expense" ? "text-red-600" : "text-green-700"
          )}
        >
          {record.type == "Expense" ? "-" : record.type == "Income" ? "+" : "~"}{" "}
          {engNumberToBanglaNumber(record.amount)} ৳
        </h2>
        <p className="text-sm">
          {engNumberToBanglaNumber(
            format(record.date, "PP").split(" ")[1].replace(",", "")
          )}{" "}
          {engMonthToBanglaFuzzy(format(record.date, "PP").split(" ")[0])}-{" "}
          {engNumberToBanglaNumber(format(record.date, "PP").split(" ")[2])}
        </p>
      </div>
    </div>
  );
}

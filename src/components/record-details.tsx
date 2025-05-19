import {
  engCategoryToBanglaFuzzy,
  engMethodToBanglaFuzzy,
  engNumberToBanglaNumber,
  engTypeToBanglaFuzzy,
} from "@/lib/helpers";
import {
  useReceiptGeneratorSheetStore,
  useRecordDetailsSheet,
} from "@/lib/store";
import { Record } from "@/types";
import { format } from "date-fns";
import {
  LucideCalendar,
  LucideCreditCard,
  LucideDollarSign,
  LucideFileText,
  LucideFolder,
  LucideReceipt,
  LucideRepeat,
} from "lucide-react";
import { Button } from "./ui/button";

export default function RecordDetails({ data }: { data: Record | undefined }) {
  const { openSheet, setReceiptId } = useReceiptGeneratorSheetStore();
  const { closeSheet } = useRecordDetailsSheet();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 border-b pb-3 flex items-center gap-2">
        <LucideFileText />
        লেনদেনের বিবরণ
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Amount */}
        <div className="flex items-center gap-3">
          <span className="border w-10 h-10 flex items-center justify-center rounded-full">
            <LucideDollarSign className="w-5 h-5" />
          </span>
          <div className="">
            <h1 className="text-sm block">লেনদেন এর পরিমাণ</h1>
            <p className="text-lg font-bold">
              + {engNumberToBanglaNumber(data?.amount!)} ৳
            </p>
          </div>
        </div>

        {/* Transaction Date */}
        <div className="flex items-center gap-3">
          <span className="border w-10 h-10 flex items-center justify-center rounded-full">
            <LucideCalendar className="w-5 h-5" />
          </span>
          <div className="">
            <h1 className="text-sm block">লেনদেন এর তারিখ</h1>
            <p className="text-lg font-semibold">
              {format(data?.date!, "PPpp")}
            </p>
          </div>
        </div>

        {/* Transaction Type */}
        <div className="flex items-center gap-3">
          <span className="border w-10 h-10 flex items-center justify-center rounded-full">
            <LucideRepeat className="w-5 h-5" />
          </span>
          <div className="">
            <h1 className="text-sm block">লেনদেন এর ধরন</h1>
            <p className="text-lg font-semibold">
              {engTypeToBanglaFuzzy(data?.type!)}
            </p>
          </div>
        </div>

        {/* Transaction Category */}
        <div className="flex items-center gap-3">
          <span className="border w-10 h-10 flex items-center justify-center rounded-full">
            <LucideFolder className="w-5 h-5" />
          </span>
          <div className="">
            <h1 className="text-sm block">লেনদেন এর ক্যাটেগরি</h1>
            <p className="text-lg font-semibold">
              {engCategoryToBanglaFuzzy(data?.category!)}
            </p>
          </div>
        </div>

        {/* Transaction Method */}
        <div className="flex items-center gap-3">
          <span className="border w-10 h-10 flex items-center justify-center rounded-full">
            <LucideCreditCard className="w-5 h-5" />
          </span>
          <div className="">
            <h1 className="text-sm block">লেনদেন এর মাধ্যম</h1>
            <p className="text-lg font-semibold">
              {engMethodToBanglaFuzzy(data?.paymentMethod!)}
            </p>
          </div>
        </div>

        {/* Transaction Method */}
        <div className="">
          <h1 className="text-lg font-medium">লেনদেনের বর্ণনা</h1>
          <p className="text-pretty px-2 border-l-2">{data?.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-center my-3">
        <Button
          variant={"link"}
          onClick={() => {
            openSheet();
            setReceiptId(data?.id);
            closeSheet();
          }}
        >
          রশিদ ডাউনলোড করুন
          <LucideReceipt />
        </Button>
      </div>
    </div>
  );
}

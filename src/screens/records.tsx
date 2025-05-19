import MonthSwitcher from "@/components/month-switcher";
import RecordCard from "@/components/record-card";
import RecordDetails from "@/components/record-details";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { db } from "@/lib/db";
import { engNumberToBanglaNumber } from "@/lib/helpers";
import { useRecordDetailsSheet } from "@/lib/store";
import { cn, getMonthYear } from "@/lib/utils";
import { Record } from "@/types";
import {
  LucideFileEdit,
  LucideLoader,
  LucideTrash2,
  LucideX,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Home() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const { isOpen, closeSheet, openSheet } = useRecordDetailsSheet();
  const [selectRecord, setSelectRecord] = useState<Record>();

  const deleteRecord = async (id: number | undefined) => {
    try {
      await db.records.delete(id);
      toast.info("Record Deleted!");
      closeSheet();
      // window.location.reload();
      getRecords();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getRecords = async () => {
    setLoading(true);
    const { month: sMonth, year: sYear } = getMonthYear(selectDate);
    try {
      const records = await db.records
        .orderBy("date")
        .filter((obj) => {
          const { month, year } = getMonthYear(obj.date);
          return month == sMonth && year == sYear;
        })
        .toArray();
      setRecords(records);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  function totalExpenseCal() {
    let totalExpense: number = 0;
    let totalIncome: number = 0;

    records.forEach((v) => {
      if (v.type == "Expense") {
        totalExpense = totalExpense + v.amount;
      }
      if (v.type == "Income") {
        totalIncome = totalIncome + v.amount;
      }
    });
    return {
      totalExpense,
      totalIncome,
      balance: totalIncome - totalExpense,
    };
  }

  const { balance, totalExpense, totalIncome } = totalExpenseCal();
  useEffect(() => {
    getRecords();
  }, [selectDate]);

  return (
    <main className="mb-16">
      <div id="header" className="p-3">
        <MonthSwitcher setSelectDate={setSelectDate} />
      </div>
      <div id="hero" className="p-2">
        <Card className="py-2 border-0 rounded-md">
          <CardContent className=" font-['HindSiliguri'] grid grid-cols-3 items-center">
            <div className="items-center justify-center text-left">
              <h1 className="text-lg">ইনকাম</h1>
              <h2 className="text-xl font-medium">
                {engNumberToBanglaNumber(totalIncome)}৳
              </h2>
            </div>
            <div className="items-center justify-center text-center">
              <h1 className="text-lg">খরচ</h1>
              <h2 className="text-xl font-medium">
                {engNumberToBanglaNumber(totalExpense)}৳
              </h2>
            </div>
            <div className="items-center justify-center text-right">
              <h1 className="text-lg">ব্যালেন্স</h1>
              <h2
                className={cn(
                  "text-xl font-medium",
                  balance < 0 && "text-red-600"
                )}
              >
                {balance < 0 && <span>-</span>}{" "}
                {engNumberToBanglaNumber(Math.abs(balance))}৳
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-1 space-y-2" id="records-list">
        {loading ? (
          <div className="w-full inline-flex items-center justify-center">
            <LucideLoader className="animate-spin" />
          </div>
        ) : records.length == 0 ? (
          <span className="inline-flex justify-center w-full mt-12">
            কোন তথ্য খুঁজে পাওয়া যায় নাই!
          </span>
        ) : (
          records.map((record) => (
            <>
              <span
                onClick={() => {
                  setSelectRecord(record);
                  openSheet();
                }}
              >
                <RecordCard key={record.id} record={record} />
                <hr className="bg-primary w-full max-w-sm h-[1px]" />
              </span>
            </>
          ))
        )}
      </div>
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent side="bottom" className="">
          <Card className="mt-6">
            <CardContent>
              <RecordDetails data={selectRecord} />
            </CardContent>
            <CardAction className="flex items-center justify-end gap-3 w-full max-w-sm px-6">
              <Button variant={"outline"} size={"icon"}>
                <LucideFileEdit />
              </Button>
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => deleteRecord(selectRecord?.id)}
              >
                <LucideTrash2 />
              </Button>
              <Button size={"icon"} onClick={closeSheet}>
                <LucideX />
              </Button>
            </CardAction>
          </Card>
        </SheetContent>
      </Sheet>
    </main>
  );
}

export default Home;

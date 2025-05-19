import { db } from "@/lib/db";
import {
  engCategoryToBanglaFuzzy,
  engMethodToBanglaFuzzy,
  engNumberToBanglaNumber,
  engTypeToBanglaFuzzy,
} from "@/lib/helpers";
import { useReceiptGeneratorSheetStore } from "@/lib/store";
import { Record } from "@/types";
import { format } from "date-fns";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { LucideImageDown, LucideLoader, LucideX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function Receipt() {
  const [receiptData, setReceiptData] = useState<Record>();
  const { receiptId, closeSheet } = useReceiptGeneratorSheetStore();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const getReceiptData = () => {
    db.records
      .get(receiptId)
      .then((v) => {
        console.log(v);
        setReceiptData(v);
      })
      .catch((r) => console.log(r));
  };
  useEffect(() => {
    getReceiptData();
  }, [receiptId]);

  const downloadImage = async () => {
    if (receiptRef.current === null) return;
    setGenerating(true);
    try {
      const dataUrl = await htmlToImage.toPng(receiptRef.current, {
        backgroundColor: "#fff",
        fontEmbedCSS: "HindSiliguri",
        preferredFontFormat: "HindSiliguri",
        quality: 0.99,
      });
      console.log(dataUrl);
      download(dataUrl, `receipt-${receiptData?.date}.png`);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      {!receiptData ? (
        <LucideLoader className="animate-spin my-16 w-full mx-auto" />
      ) : (
        <div className="p-4 w-full max-w-sm">
          <div ref={receiptRef} className="max-w-md mx-auto p-3 rounded">
            <div className="text-center">
              <img
                src="/favicon.svg"
                alt="Logo"
                className="h-12 mx-auto mb-2"
              />
              <h1 className="text-2xl font-bold">লেনদেনের রশিদ</h1>
              <p className="text-sm text-gray-600">Money Tracker App</p>
            </div>
            <div className="text-sm mt-3">
              <p>রেকর্ড আইডি- {engNumberToBanglaNumber(receiptData.id!)}</p>
              <p>তারিখ- {format(new Date(), "PPpp")}</p>
            </div>

            <div className="mt-6 border-t pt-4 text-sm space-y-2">
              <div className="flex justify-between border-b-2 py-1 border-dashed">
                <span>টাকার পরিমানঃ</span>
                <span>৳{engNumberToBanglaNumber(receiptData?.amount)}</span>
              </div>
              <div className="flex justify-between border-b-2 py-1 border-dashed">
                <span>লেনদেনের তারিখঃ</span>
                <span>{format(receiptData?.date, "PP")}</span>
              </div>
              <div className="flex justify-between border-b-2 py-1 border-dashed">
                <span>লেনদেনের ধরনঃ</span>
                <span>{engTypeToBanglaFuzzy(receiptData?.type)}</span>
              </div>
              <div className="flex justify-between border-b-2 py-1 border-dashed">
                <span>লেনদেনের ক্যাটেগরিঃ</span>
                <span>{engCategoryToBanglaFuzzy(receiptData.category)}</span>
              </div>
              <div className="flex justify-between border-b-2 py-1 border-dashed">
                <span>লেনদেনের মাধ্যমঃ</span>
                <span>
                  {engMethodToBanglaFuzzy(receiptData?.paymentMethod)}
                </span>
              </div>
              <div className="flex flex-col border-b-2 py-1 border-dashed">
                <span>লেনদেনের বিবরণঃ</span>
                <span>{receiptData?.description}</span>
              </div>
            </div>

            <div className="mt-4 text-sm">
              <p>
                <strong>অবস্থাঃ</strong>{" "}
                <span className="">
                  {receiptData?.paymentMethod == "Outstanding"
                    ? "UNPAID"
                    : "PAID"}
                </span>
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="text-right">
                <p className="mb-1">____________________</p>
                <p className="text-xs text-gray-500 text-center">স্বাক্ষর</p>
              </div>
            </div>
            <p className="text-xs mt-2">
              *এই রশিদ টি MoneyTracker অ্যাপ এর মাধ্যমে তৈরি করা। যার রেকর্ড
              অ্যাপে সংরক্ষিত রয়েছে।
            </p>
          </div>

          <div className="mt-4 text-center flex items-center justify-center gap-3">
            <Button onClick={downloadImage}>
              {generating ? (
                <LucideLoader className="animate-spin" />
              ) : (
                <>
                  <span>Download Receipt Image</span> <LucideImageDown />
                </>
              )}
            </Button>
            <Button size={"icon"} variant={"destructive"} onClick={closeSheet}>
              <LucideX />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

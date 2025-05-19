import CreateRecordForm from "@/components/create-record";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { db } from "@/lib/db";
import { useStore } from "@/lib/store";
import { Record } from "@/types";
import {
  LucideBadgePlus,
  LucideLoader,
  LucideSave,
  LucideX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function AddRecord() {
  const { isOpen, closeSheet, openSheet } = useStore();
  const [formData, setFormData] = useState<Record>({
    amount: 0,
    category: "",
    date: new Date(),
    description: "",
    paymentMethod: "",
    type: "Expense",
  });
  const [saving, setSaving] = useState(false);

  const handleCreateRecord = async () => {
    setSaving(true);
    try {
      await db.records.add(formData).then(() => {
        toast("লেনদেন সংরক্ষণ করা হয়েছে!", {
          position: "top-center",
          duration: 3000,
        });
        closeSheet();
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        duration: 3000,
        richColors: true,
      });
    } finally {
      setSaving(false);
      setFormData({
        amount: 0,
        category: "",
        date: new Date(),
        description: "",
        paymentMethod: "",
        type: "Expense",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
      <SheetTrigger>
        <button
          onClick={() => openSheet()}
          className="inline-flex flex-col items-center justify-center px-5 text-gray-500"
        >
          <LucideBadgePlus className="w-5 h-5" />
          <span className="text-xs">তৈরি</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <Card className="rounded-md border-0 shadow-muted">
          <CardHeader>
            <CardTitle>একটি নতুন লেনদেন তৈরি করুন</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateRecordForm formData={formData} setFormData={setFormData} />
          </CardContent>
          <CardAction className="flex items-center gap-3 justify-end w-full px-3">
            <Button onClick={handleCreateRecord}>
              {saving ? (
                <LucideLoader className="animate-spin" />
              ) : (
                <>
                  <LucideSave />
                  <span>সংরক্ষন</span>
                </>
              )}
            </Button>
            <Button variant={"destructive"} onClick={closeSheet}>
              <LucideX />
              <span>বাতিল</span>
            </Button>
          </CardAction>
        </Card>
      </SheetContent>
    </Sheet>
  );
}

export default AddRecord;

import { cn } from "@/lib/utils";
import { Record } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calender";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { paymentMethods, transactionCategories } from "@/lib/mock.data";
import {
  engCategoryToBanglaFuzzy,
  engMethodToBanglaFuzzy,
} from "@/lib/helpers";

export default function CreateRecordForm({
  formData,
  setFormData,
}: {
  formData: Record;
  setFormData: React.Dispatch<React.SetStateAction<Record>>;
}) {
  return (
    <div className="grid w-full h-full max-w-sm items-center gap-6">
      {/* transaction amount */}
      <span className="space-y-1.5">
        <Label htmlFor="amount">পরিমাণ</Label>
        <Input
          id="amount"
          className="py-5"
          type="number"
          value={formData.amount}
          placeholder="0.00 ৳"
          onChange={(e) =>
            setFormData({ ...formData, amount: parseInt(e.target.value) })
          }
        />
      </span>
      {/* transaction type */}
      <span className="space-y-1.5">
        <Label htmlFor="transactionType">লেনদেনের ধরন</Label>
        <RadioGroup
          id="transactionType"
          defaultValue="Expense"
          className="flex items-center justify-between p-2"
          onValueChange={(v: "Expense" | "Income" | "Transfer") =>
            setFormData({ ...formData, type: v })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Expense" id="expense" />
            <Label htmlFor="expense">খরচ</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Income" id="income" />
            <Label htmlFor="income">ইনকাম</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Transfer" id="transfer" />
            <Label htmlFor="transfer">ট্র্যান্সফার</Label>
          </div>
        </RadioGroup>
      </span>
      {/* transaction method */}
      <span className="space-y-1.5">
        <Label htmlFor="payment-method">লেনদেনের মাধ্যম</Label>
        <span id="payment-method">
          <Select
            onValueChange={(v) =>
              setFormData({ ...formData, paymentMethod: v })
            }
          >
            <SelectTrigger className="w-full py-5">
              <SelectValue placeholder="একটি লেনদেন এর মাধ্যম বাছাই করুণ" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem value={method} key={method}>
                  {engMethodToBanglaFuzzy(method)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>
      </span>
      {/* transaction category */}
      <span className="space-y-1.5">
        <Label htmlFor="transaction-category">লেনদেনের ক্যাটেগরি</Label>
        <span id="transaction-category">
          <Select
            onValueChange={(v) => setFormData({ ...formData, category: v })}
          >
            <SelectTrigger className="w-full py-5">
              <SelectValue placeholder="একটি লেনদেন এর ক্যাটেগরি বাছাই করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ইনকাম</SelectLabel>
                {transactionCategories.Incomes.map((category, index) => (
                  <SelectItem value={category} key={index}>
                    {engCategoryToBanglaFuzzy(category)}
                  </SelectItem>
                ))}
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>খরচ</SelectLabel>
                {transactionCategories.Expenses.map((category, index) => (
                  <SelectItem value={category} key={index}>
                    {engCategoryToBanglaFuzzy(category)}
                  </SelectItem>
                ))}
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>ট্র্যান্সফার</SelectLabel>
                {transactionCategories.Transfers.map((category, index) => (
                  <SelectItem value={category} key={index}>
                    {engCategoryToBanglaFuzzy(category)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
      </span>
      {/* transaction date */}
      <span className="space-y-1.5">
        <Label htmlFor="date">লেনদেনের তারিখ</Label>
        <span id="date">
          <Popover>
            <PopoverTrigger asChild className="w-full py-5">
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.date && "text-shadow-muted-foreground"
                )}
              >
                <CalendarIcon />
                {formData.date ? (
                  format(formData.date, "PPP")
                ) : (
                  <span>Pick a transaction date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                className="w-auto p-0"
                initialFocus
                onSelect={(e) => setFormData({ ...formData, date: e! })}
                selected={formData.date}
                mode="single"
              />
            </PopoverContent>
          </Popover>
        </span>
      </span>
      {/* description */}
      <span className="space-y-1.5">
        <Label htmlFor="description">লেনদেনের বর্ণনা</Label>
        <Textarea
          onChange={(v) =>
            setFormData({ ...formData, description: v.target.value })
          }
          className="w-full max-w-sm"
          spellCheck
          id="description"
          placeholder="আপনার লেনদেনের বর্নণা লিখুন(অপশনাল)"
        />
      </span>
    </div>
  );
}

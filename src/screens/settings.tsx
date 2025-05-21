import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { generateMonthlyTransactionPDF } from "@/lib/pdf-generator";
import {
  LucideBadgeInfo,
  LucideCheck,
  LucideDownload,
  LucideFacebook,
  LucideFileDown,
  LucideGithub,
  LucideLinkedin,
  LucideLoader,
  LucidePhone,
  LucideTwitter,
  LucideUser,
  LucideX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import download from "downloadjs";


function Settings() {
  const [loading, setLoading] = useState(false);
  const exportData = async () => {
    setLoading(true);
    try {
      const records = await db.records.toArray();
      const blob = new Blob([JSON.stringify({ records })], {
        type: "application/json",
      });
      const jsonFile = new File([blob], `database-${Date.now()}.db`, {
        type: "application/json",
      });
      downloadData(jsonFile);
      // return jsonFile;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadData = async (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePDFDownload = async () => {
    try {
      const data = await db.records.orderBy("date").toArray();
      await generateMonthlyTransactionPDF(data).then((file) => {
        download(file);
        toast(file);
      });
      // toast("✅");
      // toast(data[0].amount);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full mx-w-sm p-3 space-y-3 mb-16">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold font-['HindSiliguri']">
            ডেটা সংরক্ষন - Backup Data
          </CardTitle>
        </CardHeader>
        <hr />
        <CardContent>
          <p className="font-['HindSiliguri']">
            আপনার উচিত তোমার ডাটা গুলোর একটি ব্যাকআপ কপি নিরাপদ জায়গায় সংরক্ষন
            করা!
            <br />
            <span className="text-red-500">
              <br />
              যদি আপনি কোনোভাবে একবার আপনার ব্রাউসারের ডাটা মুছে ফেলো তাহলে
              আপনার সকল তথ্য মুছে যাবে, এতে আপনার ডাটাগুলি হারিয়ে ফেলবেন।
            </span>
          </p>
        </CardContent>
        <hr />
        <CardFooter>
          <CardAction className="flex w-full items-center justify-end gap-3">
            <Button onClick={exportData}>
              {loading ? (
                <LucideLoader className="animate-spin" />
              ) : (
                <>
                  JSON
                  <LucideDownload />
                </>
              )}
            </Button>
            <Button onClick={handlePDFDownload}>
              PDF
              <LucideDownload />
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <LucideBadgeInfo />
            <span className="font-bold">ডেভেলপার এর সম্পর্কে</span>
          </CardTitle>
        </CardHeader>
        <hr />
        <CardContent>
          <p className="font-['HindSiliguri']">
            <span>
              <em className="font-semibold">পেশাগত--</em>
              <br />
              আমি মেহেদী হাসান, একজন আগ্রহী ফুল-স্ট্যাক ডেভেলপার, যার একাডেমিক
              ভিত্তি পদার্থবিজ্ঞানে এবং প্রযুক্তি ও সফটওয়্যার ইঞ্জিনিয়ারিংয়ের
              প্রতি গভীর আগ্রহ রয়েছে। আমি JavaScript, React, React Native,
              Node.js এবং আধুনিক টেকনোলজির ব্যবহার করে মোবাইল ও ওয়েব
              অ্যাপ্লিকেশন তৈরি করতে পারদর্শী। আমার লক্ষ্য হল ব্যবহারবান্ধব,
              পারফর্মেন্স-ভিত্তিক এবং স্কেলযোগ্য সফটওয়্যার সমাধান তৈরি করা।
            </span>
            <hr className="my-3" />
            <span>
              <em className="font-semibold">প্রযুক্তিগত দৃষ্টিভঙ্গি--</em>
              <br />
              আমি একজন বিশ্লেষণধর্মী ও কৌতূহলী চিন্তাশীল, যিনি জটিল সমস্যা
              সমাধানে আনন্দ পান। নতুন প্রযুক্তি শেখা, বাগ ফিক্স করা এবং
              অ্যাপ্লিকেশন পারফরম্যান্স অপ্টিমাইজ করাই আমার প্রিয় কাজ। নিজে নিজে
              শেখার মাধ্যমে আমি Expo, Express.js, SQLite, GraphQL ও Tailwind
              CSS-এর মতো টুল ও লাইব্রেরি ব্যবহার করতে সক্ষম হয়েছি।
            </span>
            <hr className="my-3" />
            <span>
              <em className="font-semibold">সহযোগিতা ও মূল্যবোধ--</em>
              <br />
              আমি টিমে কাজ করতে ভালোবাসি এবং পরিষ্কার কোডিং, পারস্পরিক সহযোগিতা
              ও কার্যকর যোগাযোগকে গুরুত্ব দিই। আমার বৈজ্ঞানিক শিক্ষা এবং মানবিক
              সেবার প্রতি আগ্রহ আমাকে এমন প্রযুক্তি তৈরি করতে অনুপ্রাণিত করে যা
              সমাজে প্রকৃত প্রভাব ফেলতে পারে।
            </span>
            <hr className="my-3" />
            <span>
              <em className="font-semibold">ভবিষ্যত লক্ষ্য--</em>
              <br />
              আমি এমন টিমে কাজ করতে আগ্রহী, যেখানে উদ্ভাবন, শেখা এবং সামাজিক
              প্রভাব একসাথে কাজ করে। আমি ভবিষ্যতে একজন দক্ষ এবং দায়িত্বশীল
              ডেভেলপার হিসেবে নিজেকে গড়ে তুলতে চাই, যেখানে প্রযুক্তিগত উৎকর্ষতা
              এবং মানবিক মূল্যবোধ সমানভাবে গুরুত্ব পায়।
            </span>
          </p>
          <hr className="my-3" />
          <span className="w-full flex items-center justify-center">
            <Button>
              Download my full Resume
              <LucideFileDown />
            </Button>
          </span>
        </CardContent>
        <hr />
        <CardFooter className="flex flex-col justify-start items-start">
          <div className="w-full">
            <p className="font-bold text-left">
              ডেভেলপারের সঙ্গে যোগাযোগ করতে চান?
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 w-full mt-3">
            <Button
              variant={"link"}
              size={"icon"}
              className="border rounded-full"
            >
              <LucideFacebook />
            </Button>
            <Button
              variant={"link"}
              size={"icon"}
              className="border rounded-full"
            >
              <LucideGithub />
            </Button>
            <Button
              variant={"link"}
              size={"icon"}
              className="border rounded-full"
            >
              <LucideTwitter />
            </Button>
            <Button
              variant={"link"}
              size={"icon"}
              className="border rounded-full"
            >
              <LucideLinkedin />
            </Button>
            <Button
              variant={"link"}
              size={"icon"}
              className="border rounded-full"
            >
              <LucideUser />
            </Button>
            <Button
              variant={"link"}
              size={"icon"}
              className="border rounded-full"
            >
              <LucidePhone />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>এই আপ্পের সম্পর্কে</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            একটি দ্রুতগামী, মর্ডান ও ক্লিন UI/UIX ইন্টারফেস হিসেবে তৈরি করা
            হয়েছে!
          </p>
          <CardTitle className="my-3">বৈশিষ্ট গুলো</CardTitle>
          <ul className="ml-2">
            <li className="flex items-center gap-3">
              <LucideCheck className="w-4 h-4 text-green-500" />
              <p>সম্পূর্ণ অফলাইন সার্পোটেট</p>
            </li>
            <li className="flex items-center gap-3">
              <LucideCheck className="w-4 h-4 text-green-500" />
              <p>অফলাইন ডাটাবেজ সাপোর্ট</p>
            </li>
            <li className="flex items-center gap-3">
              <LucideCheck className="w-4 h-4 text-green-500" />
              <p>Android অ্যাপ</p>
            </li>
            <li className="flex items-center gap-3">
              <LucideCheck className="w-4 h-4 text-green-500" />
              <p>IOS অ্যাপ</p>
            </li>
            <li className="flex items-center gap-3">
              <LucideX className="w-4 h-4 text-red-500" />
              <p>ডেক্সটপ সাপোর্ট</p>
            </li>
            <li className="flex items-center gap-3">
              <LucideCheck className="w-4 h-4 text-green-500" />
              <p>ডাটাবেজ ব্যাকআপ</p>
            </li>
            <li className="flex items-center gap-3">
              <LucideCheck className="w-4 h-4 text-green-500" />
              <p>ডাটাবেজ আনালাইসেস</p>
            </li>
            <li className="flex items-center gap-3">
              <LucideCheck className="w-4 h-4 text-green-500" />
              <p>ডাটা ভিজুয়ালাইজেশন</p>
            </li>
          </ul>

          <hr className="my-3" />
          <CardTitle>ব্যাবহারিত প্রযুক্তি</CardTitle>
          <ul className="list-disc ml-6">
            <li>React JS</li>
            <li>Tailwind Css</li>
            <li>Shadcn UI</li>
            <li>Zutand</li>
            <li>Chart.JS</li>
            <li>Recat Router</li>
            <li>Zod</li>
            <li>Other's</li>
          </ul>
        </CardContent>
        <hr className="my-3" />
        <CardFooter className="w-full flex items-center flex-col justify-center max-w-sm">
          <p className="text-center">ভার্সন: ১.০.০</p>
          <p className="text-center">
            এই সাইটের সকল তথ্য এবং এর সোর্সকোড সবার জন্য উন্মুক্ত। ভুল ক্রুটি
            পরিলক্ষিত হলে{" "}
            <a href="#" className="underline font-semibold text-primary">
              অভিযোগ লিঙ্কে
            </a>{" "}
            গিয়ে জানানোর অনুরোধ করা গেলো।
          </p>
          <hr className="my-2" />
          <Button variant={"link"}
          >
          <a href='https://github.com/devusimple/money-tracking.git' target='_blink' className='flex items-center justify-center'>
            <LucideGithub />
            সোর্সকোড লিঙ্ক
              </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Settings;

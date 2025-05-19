import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import AddRecord from "@/screens/add-record";
import {
  LucideChartPie,
  LucideFolderClock,
  LucideSettings,
} from "lucide-react";
import { NavLink } from "react-router";

export default function BottomTabs() {
  useStore();
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-500 dark:border-gray-400">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            cn(
              "cursor-pointer inline-flex flex-col items-center justify-center px-5 text-gray-500",
              isActive && "text-teal-400 border-t-2 border-green-500"
            )
          }
        >
          <LucideFolderClock className="w-5 h-5" />
          <span className="text-xs">ইতিহাস</span>
        </NavLink>

        <span className="inline-flex flex-col items-center justify-center px-5 text-gray-500">
          <AddRecord />
        </span>

        <NavLink
          to={"/analysis"}
          className={({ isActive }) =>
            cn(
              "cursor-pointer inline-flex flex-col items-center justify-center px-5 text-gray-500",
              isActive && "text-teal-400 border-t-2 border-green-500"
            )
          }
        >
          <LucideChartPie className="w-5 h-5" />
          <span className="text-xs">এনালাইসিস</span>
        </NavLink>
        <NavLink
          to={"/settings"}
          className={({ isActive }) =>
            cn(
              "cursor-pointer inline-flex flex-col items-center justify-center px-5 text-gray-500",
              isActive && "text-teal-400 border-t-2 border-green-500"
            )
          }
        >
          <LucideSettings className="w-5 h-5" />
          <span className="text-xs">সেটিংস্‌</span>
        </NavLink>
      </div>
    </div>
  );
}

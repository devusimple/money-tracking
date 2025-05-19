import { LucideBadgeAlert } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./screens/records";
import Settings from "./screens/settings";
import BottomTabs from "./components/bottom-tabs";
import Analysis from "./screens/analysis";
import AllSheetContainer from "./components/sheet";

export default function App() {
  const size = window.screen.width;

  if (size > 400)
    return (
      <div className="grid place-content-center h-screen text-center">
        <LucideBadgeAlert className="mx-auto text-red-600" />
        <h1 className="text-lg font-semibold">
          We can't serve our application for desktop.
        </h1>
        <p className="text-sm">
          This app currently serve for only mobile browser or app.
        </p>
      </div>
    );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analysis" element={<Analysis />} />
        </Routes>
        <BottomTabs />
      </BrowserRouter>
      <AllSheetContainer />
    </>
  );
}

import { useReceiptGeneratorSheetStore } from "@/lib/store";
import { Sheet, SheetContent } from "./ui/sheet";
import Receipt from "./receipt";

export default function AllSheetContainer() {
  const { isOpen, closeSheet } = useReceiptGeneratorSheetStore();
  return (
    <>
      {/* Receipt Making Sheet */}
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent side="bottom">
          <Receipt />
        </SheetContent>
      </Sheet>
    </>
  );
}

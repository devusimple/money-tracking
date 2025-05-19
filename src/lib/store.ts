import { create } from "zustand";

type SheetState = {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggleSheet: () => void;
};

export const useStore = create<SheetState>((set) => ({
  isOpen: false,
  openSheet: () => set({ isOpen: true }),
  closeSheet: () => set({ isOpen: false }),
  toggleSheet: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useRecordDetailsSheet = create<SheetState>((set) => ({
  isOpen: false,
  openSheet: () => set({ isOpen: true }),
  closeSheet: () => set({ isOpen: false }),
  toggleSheet: () => set((state) => ({ isOpen: !state.isOpen })),
}));

type ReceiptProps = SheetState & {
  receiptId: number | null;
  setReceiptId: (id: number | undefined) => void;
};

export const useReceiptGeneratorSheetStore = create<ReceiptProps>((set) => ({
  isOpen: false,
  openSheet: () => set({ isOpen: true }),
  closeSheet: () => set({ isOpen: false }),
  toggleSheet: () => set((state) => ({ isOpen: !state.isOpen })),
  receiptId: null,
  setReceiptId: (id) => set({ receiptId: id }),
}));

import { create } from "zustand";

interface useStoreModalStore {
  isOpen: boolean;
  onOpen: () => void; // always use void instead of an empty object, i.e. {}
  onClose: () => void; // always use void instead of an empty object, i.e. {}
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

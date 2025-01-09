import { create } from "zustand";

export type ModalType = "gallery" | "profile" | "timeline";

interface ModalState {
  type: ModalType | null;
  setType: (type: ModalType) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = create<ModalState>((set) => ({
  type: null,
  setType: (type) => set({ type }),
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModal;

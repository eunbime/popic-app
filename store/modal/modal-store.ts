import { create } from "zustand";

export type ModalType = "post-upload" | "profile" | "timeline" | "post-view";

interface ModalState {
  type: ModalType | null;
  setType: (type: ModalType) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  data: any;
  setData: (data: any) => void;
}

const useModal = create<ModalState>((set) => ({
  type: null,
  setType: (type) => set({ type }),
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  data: null,
  setData: (data) => set({ data }),
}));

export default useModal;

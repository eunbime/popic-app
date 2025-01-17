import { Post } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "post-upload"
  | "post-view"
  | "profile"
  | "timeline"
  | "confirm";

export type ModalData = null | {
  post?: Post | null;
  onConfirm?: () => void;
};

interface ModalState {
  type: ModalType | null;
  setType: (type: ModalType) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  data: ModalData;
  setData: (data: ModalData) => void;
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

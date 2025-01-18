import { PostUploadSchema } from "@/schemas";
import { Post } from "@prisma/client";
import { z } from "zod";
import { create } from "zustand";

export type ModalType =
  | "post-upload"
  | "post-view"
  | "profile"
  | "timeline"
  | "delete-confirm"
  | "edit-confirm";

export type ModalData = null | {
  post?: Post | null;
  onConfirm?: null | (() => void);
  title?: string;
  description?: string;
  formData?: z.infer<typeof PostUploadSchema> | null;
};

interface ModalState {
  type: ModalType | null;
  previousType: ModalType | null;
  setType: (type: ModalType) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  closeConfirmModal: () => void;
  data: ModalData;
  previousData: ModalData | null;
  setData: (data: ModalData) => void;
}

const useModal = create<ModalState>((set) => ({
  type: null,
  previousType: null,
  setType: (type) =>
    set((state) => ({
      type,
      previousType: type === "edit-confirm" ? state.type : null,
      previousData: type === "edit-confirm" ? state.data : null,
    })),
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () =>
    set({
      type: null,
      previousType: null,
      isOpen: false,
      data: null,
      previousData: null,
    }),
  closeConfirmModal: () =>
    set((state) => ({
      type: state.previousType,
      data: {
        ...state.previousData,
        formData: state.data?.formData, // 현재 formData 유지
      },
      previousType: null,
      previousData: null,
      isOpen: !!state.previousType,
    })),
  data: null,
  previousData: null,
  setData: (data) => set({ data, previousData: null }),
}));

export default useModal;

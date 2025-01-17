import { Post } from "@prisma/client";
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
  onConfirm?: () => void;
  title?: string;
  description?: string;
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
  setData: (data: ModalData) => void;
}

const useModal = create<ModalState>((set) => ({
  type: null,
  previousType: null,
  setType: (type) =>
    set((state) => ({
      type,
      previousType: type === "edit-confirm" ? state.type : null,
    })),
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () =>
    set({ type: null, previousType: null, isOpen: false, data: null }),
  closeConfirmModal: () =>
    set((state) => {
      // delete-confirm 모달이 단독으로 열렸을 때는 모든 상태 초기화
      if (state.type === "delete-confirm") {
        return {
          type: null,
          previousType: null,
          data: null,
          isOpen: false,
        };
      }
      // 다른 모달 위에서 열렸을 때는 이전 모달로 돌아가기
      if (state.type === "edit-confirm") {
        return {
          type: state.previousType,
          previousType: null,
          data: null,
          isOpen: true,
        };
      }
      // 기본적으로는 모든 모달 닫기
      return {
        type: null,
        previousType: null,
        data: null,
        isOpen: false,
      };
    }),
  data: null,
  setData: (data) => set({ data }),
}));

export default useModal;

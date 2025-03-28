import useModal from "@/store/modal/modal-store";
import { Button } from "../ui/button";

const ConfirmModal = () => {
  const { type, data, closeConfirmModal, isOpen, closeModal } = useModal();

  const handleConfirm = () => {
    if (data && data.onConfirm) {
      data.onConfirm();
    }
    closeModal();
  };

  const handleCancel = () => {
    if (type === "edit-confirm") {
      closeConfirmModal();
    } else {
      closeModal();
    }
  };

  if (
    !isOpen ||
    (type !== "delete-confirm" &&
      type !== "edit-confirm" &&
      type !== "save-confirm")
  )
    return null;

  return (
    <div
      className="fixed inset-0 z-[99] bg-black/50 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col justify-center items-center gap-5 w-[90%] sm:w-[380px] h-[200px] dark:bg-gray-800 bg-white text-black dark:text-white rounded-md">
        <h1 className="text-xl font-bold">{data?.title}</h1>
        <p className="text-sm text-gray-500">{data?.description}</p>
        <div className="flex justify-end gap-10">
          <Button variant="basic" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

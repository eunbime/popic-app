import useModal from "@/store/modal/modal-store";
import { Button } from "../ui/button";

const ConfirmModal = () => {
  const { type, data, closeModal, isOpen } = useModal();

  const handleConfirm = () => {
    if (data && data.onConfirm) {
      data.onConfirm();
      closeModal();
    }
  };

  if (!isOpen || type !== "confirm") return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form
        className="flex flex-col justify-center items-center gap-5 w-[400px] h-[200px] bg-white rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">삭제하시겠습니까?</h1>
        <div className="flex justify-end gap-10">
          <Button variant="outline" onClick={closeModal}>
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmModal;

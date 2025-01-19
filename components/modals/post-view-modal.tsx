"use client";

import Image from "next/image";

import { TPostWithLikes } from "@/types";
import { formatDateForTimeline } from "@/lib/formatDate";
import useUser from "@/store/user/user-store.";
import useModal from "@/store/modal/modal-store";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useCustomMutation } from "@/hooks/useMutation";
import { Button } from "@/components/ui/button";

const PostUploadModal = () => {
  const { user } = useUser();

  const {
    isOpen,
    closeModal,
    type,
    data: postData,
    setType,
    openModal,
    setData,
  } = useModal();

  const { deleteMutation } = useCustomMutation();
  const { mutate: deletePost, isPending: isDeletePending } = deleteMutation;

  useScrollLock(isOpen);

  const handleEdit = () => {
    setType("post-upload");
  };

  const handleDelete = () => {
    setType("delete-confirm");
    openModal();
    setData({
      onConfirm: () => deletePost(postData?.post as TPostWithLikes),
      title: "정말 삭제하시겠습니까?",
      description: "삭제된 포스트는 복구할 수 없습니다.",
    });
  };

  console.log("postData", postData);

  if (!isOpen || type !== "post-view") return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="w-[400px] h-[800px] bg-white rounded-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-5">
          <h1 className="text-2xl font-bold">
            {postData?.post?.date
              ? formatDateForTimeline(new Date(postData.post.date))
              : ""}
          </h1>
          <button
            className="text-2xl font-bold"
            onClick={closeModal}
            type="button"
          >
            X
          </button>
        </div>
        <div className="flex flex-col w-full h-[700px] items-center justify-between gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            {postData?.post?.imageUrl && (
              <Image
                src={postData.post.imageUrl}
                alt="gallery"
                width={350}
                height={350}
                className="object-cover"
              />
            )}
            <p className="text-xl font-bold w-full text-center">
              {postData?.post?.title}
            </p>
            <p className="text-sm px-7 w-full text-center text-gray-500 line-clamp-10 break-all overflow-y-auto">
              {postData?.post?.content}
            </p>
          </div>
          {user?.id === postData?.post?.authorId && (
            <div className="flex justify-end items-center gap-2">
              <Button onClick={handleEdit}>Edit</Button>
              <Button onClick={handleDelete} disabled={isDeletePending}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostUploadModal;

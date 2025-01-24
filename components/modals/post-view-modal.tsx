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

  if (!isOpen || type !== "post-view") return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="w-[400px] h-full dark:bg-gray-900 bg-white rounded-md overflow-y-auto">
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700 border-gray-200 mb-5 text-black dark:text-white">
          <h1 className="text-xl font-bold">
            {postData?.post?.date
              ? formatDateForTimeline(new Date(postData.post.date))
              : ""}
          </h1>
          <button
            className="text-xl font-bold"
            onClick={closeModal}
            type="button"
          >
            X
          </button>
        </div>
        <div className="flex flex-col w-full h-[750px] items-center justify-between gap-4 px-5">
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
            <p className="text-xl font-bold w-full text-center break-all line-clamp-1 dark:text-white text-black ">
              {postData?.post?.title}
            </p>
            <p className="text-sm w-full text-center text-gray-500 break-all">
              {postData?.post?.content}
            </p>
          </div>
          {user?.id === postData?.post?.authorId && (
            <div className="flex justify-end items-center gap-2 pb-10">
              <Button variant="basic" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                variant="basic"
                onClick={handleDelete}
                disabled={isDeletePending}
              >
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

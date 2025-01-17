"use client";

import useModal from "@/store/modal/modal-store";
import { formatDateForTimeline } from "@/lib/formatDate";
import Image from "next/image";
import { Button } from "../ui/button";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useUser from "@/store/user/user-store.";

const PostUploadModal = () => {
  const { user } = useUser();

  const { isOpen, closeModal, type, data: postData, setType } = useModal();
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/posts/${postData?.post?.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
  });

  useScrollLock(isOpen);

  if (!isOpen || type !== "post-view") return null;

  const handleEdit = () => {
    setType("post-upload");
  };

  const handleDelete = () => {
    deletePost();
    closeModal();
  };

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
            <Image
              src={
                postData?.post?.imageUrl ||
                "https://via.placeholder.com/350x350?text=photo"
              }
              alt="gallery"
              width={350}
              height={350}
              className="object-cover"
            />
            <p className="text-md font-bold">{postData?.post?.title}</p>
            <p className="text-sm px-7 text-gray-500 line-clamp-10 break-all overflow-y-auto">
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

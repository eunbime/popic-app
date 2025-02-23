"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { PostUploadSchema } from "@/schemas";
import useUser from "@/store/user/user-store.";
import useModal from "@/store/modal/modal-store";
import { usePostsMutation } from "@/hooks/usePostsMutation";
import DatePicker from "@/components/gallery/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PrivateSwitch from "@/components/gallery/private-switch";
import FileUpload from "@/components/file-upload";
import TagsForm from "@/components/form/tags-form";

const PostUploadModal = () => {
  const {
    isOpen,
    type,
    data: postData,
    setType,
    setData,
    openModal,
    closeModal,
  } = useModal();

  const { user } = useUser();

  const queryClient = useQueryClient();

  const { uploadMutation, editMutation } = usePostsMutation();
  const { mutateAsync: uploadPost, isPending: isUploadPending } =
    uploadMutation;
  const { mutateAsync: editPost, isPending: isEditPending } = editMutation;

  const [isSettling, setIsSettling] = useState(false);

  const form = useForm<z.infer<typeof PostUploadSchema>>({
    resolver: zodResolver(PostUploadSchema),
    defaultValues: {
      title: "",
      content: "",
      date: new Date(),
      imageUrl: "",
      isPrivate: false,
      tags: [],
    },
    mode: "onChange",
  });

  // 포스트 데이터 초기화
  useEffect(() => {
    if (isOpen && type === "post-upload") {
      // 편집 모드
      if (postData?.post || postData?.formData) {
        if (postData.post) {
          form.reset({
            id: postData.post?.id,
            title: postData.post?.title,
            content: postData.post.content,
            date: new Date(postData.post.date),
            imageUrl: postData.post.imageUrl || "",
            isPrivate: postData.post.isPrivate,
            tags: postData.post.tags,
          });
        }
      } else {
        // 업로드 모드
        form.reset({
          title: "",
          content: "",
          date: new Date(),
          imageUrl: "",
          isPrivate: false,
          tags: [],
        });
      }
    }
  }, [isOpen, postData?.post, postData?.formData, form, type]);

  // 포스트 업로드 및 수정
  const onSubmit = async (values: z.infer<typeof PostUploadSchema>) => {
    try {
      setIsSettling(true);
      if (postData?.post || postData?.formData) {
        await editPost(
          { values, postId: postData?.post?.id as string },
          {
            onSettled: async () => {
              await queryClient.invalidateQueries().then(() => {
                setIsSettling(false);
                closeModal();
              });
            },
          }
        );
      } else {
        await uploadPost(
          { values, authorId: user?.id as string },
          {
            onSettled: async () => {
              await queryClient.invalidateQueries().then(() => {
                setIsSettling(false);
                closeModal();
              });
            },
          }
        );
      }
    } catch (error) {
      setIsSettling(false);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  const handleExit = () => {
    const currentValues = form.getValues();
    setType("edit-confirm");
    setData({
      onConfirm: () => form.reset(),
      title: "저장하지 않으시겠습니까?",
      description: "작성한 내용이 사라집니다.",
      formData: currentValues,
    });
    openModal();
  };

  if (!isOpen || type !== "post-upload") return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        className="w-full max-w-[430px] h-full dark:bg-gray-900 bg-white text-black dark:text-white overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 border-gray-200 mb-5">
          <h1 className="text-2xl font-bold">Upload Post</h1>
          <button
            className="text-2xl font-bold"
            onClick={handleExit}
            type="button"
          >
            X
          </button>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4 pb-10"
        >
          {/* 이미지 업로드 */}
          <div
            className={cn(
              "w-[300px] h-[300px] bg-gray-200 rounded-md relative overflow-hidden",
              form.formState.errors.imageUrl && "border-2 border-red-500",
              form.getValues("imageUrl") && "border-2 border-gray-200"
            )}
          >
            <FileUpload
              endpoint="galleryImage"
              onChange={(url) => form.setValue("imageUrl", url as string)}
              value={form.watch("imageUrl") || null}
            />
          </div>

          {/* 제목 입력 */}
          <div className="flex flex-col w-[300px] gap-4">
            <Input placeholder="Title" {...form.register("title")} />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.title.message}
              </p>
            )}

            {/* 내용 입력 */}
            <Textarea
              {...form.register("content")}
              placeholder="Description"
              rows={5}
            />
            {form.formState.errors.content && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.content.message}
              </p>
            )}
            {/* 날짜 선택 */}
            <div className="flex items-center gap-3">
              <DatePicker
                date={form.watch("date")}
                setDate={(date) => form.setValue("date", date)}
              />
              <PrivateSwitch
                isPrivate={form.watch("isPrivate")}
                setIsPrivate={(isPrivate) =>
                  form.setValue("isPrivate", isPrivate)
                }
              />
            </div>
            {/* 태그 입력 */}
            <TagsForm
              tags={form.watch("tags")}
              onChange={(tags) => form.setValue("tags", tags)}
            />
            {form.formState.errors.tags && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.tags.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isUploadPending || isEditPending || isSettling}
            className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all duration-300"
          >
            {isUploadPending || isEditPending || isSettling
              ? "Loading..."
              : postData?.post || postData?.formData
              ? "Edit"
              : "Upload"}{" "}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostUploadModal;

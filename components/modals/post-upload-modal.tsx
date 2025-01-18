"use client";

import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";

import { cn } from "@/lib/utils";
import useModal from "@/store/modal/modal-store";
import useUser from "@/store/user/user-store.";
import { PostUploadSchema } from "@/schemas";
import DatePicker from "@/components/gallery/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PrivateSwitch from "@/components/gallery/private-switch";
import FileUpload from "@/components/file-upload";

const PostUploadModal = () => {
  const {
    isOpen,
    type,
    data: postData,
    setType,
    setData,
    openModal,
    closeModal,
    previousType,
  } = useModal();
  const user = useUser((state) => state.user);

  const form = useForm<z.infer<typeof PostUploadSchema>>({
    resolver: zodResolver(PostUploadSchema),
    defaultValues: {
      title: "",
      content: "",
      date: new Date(),
      imageUrl: "",
      isPrivate: false,
    },
  });

  form.watch("imageUrl");

  // 포스트 데이터 초기화
  useEffect(() => {
    if (isOpen && type === "post-upload") {
      if (postData?.post) {
        // 편집 모드
        form.reset({
          title: postData.post.title,
          content: postData.post.content,
          date: new Date(postData.post.date),
          imageUrl: postData.post.imageUrl || "",
          isPrivate: postData.post.isPrivate || false,
        });
      } else if (postData?.formData && previousType === "edit-confirm") {
        form.reset(postData.formData);
      } else {
        form.reset();
      }
    }
  }, [isOpen, postData?.post, postData?.formData, form, type, previousType]);

  const queryClient = useQueryClient();
  // 포스트 업로드
  const { mutate: uploadPost, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof PostUploadSchema>) => {
      return axios.post("/api/posts", {
        ...values,
        authorId: user?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({ queryKey: ["posts", null] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
      form.reset();
      closeModal();
    },
    onError: (error) => {
      console.log("[POST_UPLOAD_ERROR]", error);
    },
  });

  // 포스트 수정
  const { mutate: editPost, isPending: isEditPending } = useMutation({
    mutationFn: (values: z.infer<typeof PostUploadSchema>) => {
      if (!postData?.post?.id) throw new Error("Post ID is required");

      return axios.put(`/api/posts/${postData?.post?.id}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
      form.reset();
      closeModal();
    },
    onError: (error) => {
      console.log("[POST_EDIT_ERROR]", error);
    },
  });

  // 포스트 업로드 및 수정
  const onSubmit = async (values: z.infer<typeof PostUploadSchema>) => {
    try {
      if (postData?.post || postData?.formData) {
        editPost(values);
      } else {
        uploadPost(values);
      }
    } catch (error) {
      console.log("[POST_SUBMIT_ERROR]", error);
    }
  };

  const handleExit = () => {
    const currentValues = form.getValues();
    setType("edit-confirm");
    setData({
      onConfirm: () => form.reset(),
      title: "정말 나가시겠습니까?",
      description: "작성한 내용이 사라집니다.",
      formData: currentValues,
    });
    openModal();
  };

  console.log({ data: postData?.formData });

  if (!isOpen || type !== "post-upload") return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        className="w-[400px] h-full bg-white rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-5">
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
          className="flex flex-col items-center justify-center gap-4"
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
              value={form.getValues("imageUrl") || null}
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
              className="line-clamp-6"
              rows={6}
              maxLength={500}
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
                setIsPrivate={(value) => form.setValue("isPrivate", value)}
              />
            </div>
          </div>
          <Button type="submit" disabled={isPending || isEditPending}>
            {postData?.post || postData?.formData ? "Edit" : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostUploadModal;

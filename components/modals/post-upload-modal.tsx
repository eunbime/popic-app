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
  const { isOpen, closeModal, type, data: post } = useModal();
  const user = useUser((state) => state.user);

  const queryClient = useQueryClient();
  const { mutate: uploadPost, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof PostUploadSchema>) => {
      return axios.post("/api/posts", {
        ...data,
        authorId: user?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts-by-date"],
      });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
  });

  const { mutate: editPost, isPending: isEditPending } = useMutation({
    mutationFn: (data: z.infer<typeof PostUploadSchema & { id: string }>) => {
      return axios.put(`/api/posts/${post?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts-by-date"],
      });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
  });

  const form = useForm<z.infer<typeof PostUploadSchema>>({
    resolver: zodResolver(PostUploadSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      date: post?.date || new Date(),
      imageUrl: post?.imageUrl || "",
      isPrivate: post?.isPrivate || false,
    },
  });

  form.watch("imageUrl");

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
        date: new Date(post.date),
        imageUrl: post.imageUrl as string,
        isPrivate: post.isPrivate,
      });
    }
  }, [post, form]);

  const handleCloseModal = () => {
    form.reset();
    closeModal();
  };

  const onSubmit = async (data: z.infer<typeof PostUploadSchema>) => {
    try {
      if (post?.id) {
        editPost({
          ...data,
          id: post?.id,
        });
      } else {
        uploadPost(data);
      }
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

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
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}
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
                isPrivate={form.getValues("isPrivate")}
                setIsPrivate={(isPrivate) =>
                  form.setValue("isPrivate", isPrivate)
                }
              />
            </div>
          </div>
          <Button type="submit" disabled={isPending || isEditPending}>
            {post ? "Edit" : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostUploadModal;

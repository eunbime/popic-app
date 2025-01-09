"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";

import useModal from "@/store/modal/modal-store";
import useUser from "@/store/user/user-store.";
import DatePicker from "@/components/gallery/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostUploadSchema } from "@/schemas";
import PrivateSwitch from "@/components/gallery/private-switch";

const PostUploadModal = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadPost, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof PostUploadSchema>) => {
      return axios.post("/api/posts", {
        ...data,
        authorId: user?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const user = useUser((state) => state.user);
  const { isOpen, closeModal, type } = useModal();

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

  const handleCloseModal = () => {
    form.reset();
    closeModal();
  };

  const onSubmit = async (data: z.infer<typeof PostUploadSchema>) => {
    try {
      uploadPost(data);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen || type !== "gallery") return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="w-[400px] h-[800px] bg-white rounded-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-5">
          <h1 className="text-2xl font-bold">Upload Post</h1>
          <button
            className="text-2xl font-bold"
            onClick={handleCloseModal}
            type="button"
          >
            X
          </button>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          {/* 이미지 업로드 영역 */}
          <div className="w-[300px] h-[300px] bg-gray-500 rounded-md"></div>
          <div className="flex flex-col w-[300px] gap-4">
            <Input placeholder="Title" {...form.register("title")} />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.title.message}
              </p>
            )}

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
          <Button type="submit" disabled={isPending}>
            {isPending ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostUploadModal;

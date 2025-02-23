import { z } from "zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostUploadSchema } from "@/schemas";
import { TPostWithLikes } from "@/types";

export const usePostsMutation = () => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async ({
      values,
      authorId,
    }: {
      values: z.infer<typeof PostUploadSchema>;
      authorId: string;
    }) => {
      await axios.post("/api/posts", {
        ...values,
        authorId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", null] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
      queryClient.invalidateQueries({ queryKey: ["posts-by-date"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("업로드에 실패했습니다.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (post: TPostWithLikes) => {
      await axios.delete(`/api/posts/${post.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", null] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
      queryClient.invalidateQueries({ queryKey: ["posts-by-date"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("삭제에 실패했습니다.");
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({
      values,
      postId,
    }: {
      values: z.infer<typeof PostUploadSchema>;
      postId: string;
    }) => {
      if (!postId) throw new Error("Post ID is required");
      await axios.put(`/api/posts/${postId}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", null],
      });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
      queryClient.invalidateQueries({ queryKey: ["posts-by-date"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("수정에 실패했습니다.");
    },
  });

  return { uploadMutation, deleteMutation, editMutation };
};

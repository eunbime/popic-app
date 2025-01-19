import { z } from "zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostUploadSchema } from "@/schemas";
import { TPostWithLikes } from "@/types";

export const useCustomMutation = () => {
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
    },
    onError: (error) => {
      console.log("[POST_UPLOAD_ERROR]", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (post: TPostWithLikes) => {
      await axios.delete(`/api/posts/${post.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
    onError: (error) => {
      console.log("[DELETE_POST_ERROR]", error);
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
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
    onError: (error) => {
      console.log("[POST_EDIT_ERROR]", error);
    },
  });

  return { uploadMutation, deleteMutation, editMutation };
};

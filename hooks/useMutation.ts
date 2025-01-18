import { PostUploadSchema } from "@/schemas";
import { TPostWithLikes } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const useCustomMutation = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (post: TPostWithLikes) => {
      await axios.delete(`/api/posts/${post.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async ({
      values,
      userId,
    }: {
      values: z.infer<typeof PostUploadSchema>;
      userId: string;
    }) => {
      await axios.post("/api/posts", {
        ...values,
        authorId: userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({ queryKey: ["posts", null] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
    onError: (error) => {
      console.log("[POST_UPLOAD_ERROR]", error);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({
      values,
      postId,
    }: {
      values: z.infer<typeof PostUploadSchema>;
      postId: string;
    }) => {
      if (!postId) throw new Error("Post ID is required");

      return axios.put(`/api/posts/${postId}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
    onError: (error) => {
      console.log("[POST_EDIT_ERROR]", error);
    },
  });

  return { deleteMutation, uploadMutation, editMutation };
};

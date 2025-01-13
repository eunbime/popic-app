"use client";

import useUser from "@/store/user/user-store.";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface UseLikeProps {
  postId: string;
  initialLikedByUser?: boolean;
  initialLikesCount?: number;
}

export const useLike = ({
  postId,
  initialLikedByUser,
  initialLikesCount,
}: UseLikeProps) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(initialLikedByUser);
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);

  const { mutate: likeMutation, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/posts/like", {
        postId,
      });
      return response.data;
    },
    onMutate: () => {
      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    },
    onSuccess: (data) => {
      if (data?.likes) {
        setIsLiked(data.isLiked);
        setLikesCount(data.likesCount);
      }

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["like-posts"] });
    },
    onError: (error) => {
      setIsLiked(initialLikedByUser);
      setLikesCount(initialLikesCount || 0);
      console.error("Error toggling like:", error);
    },
  });

  const toggleLike = async () => {
    if (!user) {
      return;
    }
    likeMutation();
  };

  return { isLiked, likesCount, isLoading, toggleLike };
};

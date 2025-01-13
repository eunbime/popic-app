"use client";

import useUser from "@/store/user/user-store.";
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
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(initialLikedByUser);
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = async () => {
    if (!user) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/posts/like", {
        postId,
        action: isLiked ? "unlike" : "like",
      });

      if (response.data.success) {
        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLiked, likesCount, isLoading, toggleLike };
};

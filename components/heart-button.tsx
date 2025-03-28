import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { TPostWithLikes } from "@/types";
import { useLike } from "@/hooks/uselike";

interface HeartButtonProps {
  post: TPostWithLikes;
  userId?: string;
}

const HeartButton = ({ post, userId }: HeartButtonProps) => {
  const { isLiked, toggleLike, isLoading, likesCount } = useLike({
    postId: post.id,
    initialLikedByUser: post.likes.some((like) => like.userId === userId),
    initialLikesCount: post.likes.length,
  });

  return (
    <button
      disabled={isLoading}
      className="hover:scale-105 transition-all duration-300"
      onClick={(e) => {
        e.stopPropagation();
        toggleLike();
      }}
    >
      {isLiked ? (
        <IoHeart className="w-7 h-7 text-red-600" />
      ) : (
        <IoHeartOutline className="w-7 h-7 text-muted-foreground cursor-pointer" />
      )}
      <span className="text-sm text-muted-foreground">{likesCount}</span>
    </button>
  );
};

export default HeartButton;

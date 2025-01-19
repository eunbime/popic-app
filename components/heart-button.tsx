import { useLike } from "@/hooks/uselike";
import { TPostWithLikes } from "@/types";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

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
      className="hover:opacity-80 hover:scale-105 transition-all duration-300"
      onClick={(e) => {
        e.stopPropagation();
        toggleLike();
      }}
    >
      {isLiked ? (
        <IoHeart className="w-7 h-7 text-red-600" />
      ) : (
        <IoHeartOutline className="w-7 h-7 text-black opacity-50 cursor-pointer" />
      )}
      <span className="text-sm text-black opacity-50">{likesCount}</span>
    </button>
  );
};

export default HeartButton;

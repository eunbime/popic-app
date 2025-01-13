import { useLike } from "@/hooks/uselike";
import { TPostWithLikes } from "@/types";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface HeartButtonProps {
  post: TPostWithLikes;
  userId: string;
}

const HeartButton = ({ post, userId }: HeartButtonProps) => {
  const { isLiked, toggleLike, isLoading } = useLike({
    postId: post.id,
    initialLikedByUser: post.likes.some((like) => like.userId === userId),
    initialLikesCount: post.likes.length,
  });

  return (
    <button
      disabled={isLoading}
      className="hover:opacity-70 transition-opacity duration-300"
      onClick={(e) => {
        e.stopPropagation();
        toggleLike();
      }}
    >
      {isLiked ? (
        <IoHeart className="w-7 h-7 text-red-500" />
      ) : (
        <IoHeartOutline className="w-7 h-7 text-gray-500" />
      )}
    </button>
  );
};

export default HeartButton;

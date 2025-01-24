import Image from "next/image";
import { TPostsWithAuthorAndLikes } from "@/types";
import HeartButton from "../heart-button";
import useUser from "@/store/user/user-store.";
import useModal from "@/store/modal/modal-store";

interface LikePostBoxProps {
  post: TPostsWithAuthorAndLikes;
}

const LikePostBox = ({ post }: LikePostBoxProps) => {
  const { user } = useUser();
  const { openModal, setType, setData } = useModal();

  const handleClick = () => {
    setType("post-view");
    setData({ post });
    openModal();
  };

  return (
    <div className="relative w-[110px] h-[110px] rounded-sm overflow-hidden bg-gray-400">
      <Image
        src={post.imageUrl as string}
        alt="Like Post"
        fill
        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={handleClick}
      />
      <div className="absolute top-2 right-2">
        <HeartButton post={post} userId={user?.id} />
      </div>
    </div>
  );
};

export default LikePostBox;

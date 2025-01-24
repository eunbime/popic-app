import Image from "next/image";
import { TPostsWithAuthorAndLikes } from "@/types";
import HeartButton from "../heart-button";
import useUser from "@/store/user/user-store.";

interface LikePostBoxProps {
  post: TPostsWithAuthorAndLikes;
}

const LikePostBox = ({ post }: LikePostBoxProps) => {
  const { user } = useUser();

  return (
    <div className="relative w-[110px] h-[110px] rounded-sm overflow-hidden bg-gray-400">
      <Image
        src={post.imageUrl as string}
        alt="Like Post"
        fill
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2">
        <HeartButton post={post} userId={user?.id} />
      </div>
    </div>
  );
};

export default LikePostBox;

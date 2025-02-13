import Image from "next/image";

import { TPostsWithAuthorAndLikes } from "@/types";
import useModal from "@/store/modal/modal-store";
import useUser from "@/store/user/user-store.";
import HeartButton from "../heart-button";
import UserAvatar from "../common/user-avatar";

interface PostBoxProps {
  post: TPostsWithAuthorAndLikes;
}

const PostBox = ({ post }: PostBoxProps) => {
  const { user } = useUser();
  const { openModal, setType, setData } = useModal();

  const handlePostClick = () => {
    setType("post-view");
    setData({ post });
    openModal();
  };

  return (
    <div className="w-full h-full flex gap-10">
      <div className="flex flex-col gap-2 items-center group h-fit">
        <UserAvatar image={post.author.image} author={post.author} size="lg" />
        <p className="text-sm font-semibold text-gray-500 cursor-pointer group-hover:dark:text-white group-hover:text-black transition-colors duration-300">
          {post.author.name}
        </p>
      </div>
      <div className="grid grid-cols-1 w-full h-full">
        <div
          onClick={handlePostClick}
          className="relative w-full max-w-[400px] aspect-square rounded-md overflow-hidden bg-gray-400 cursor-pointer"
        >
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="post"
              fill
              sizes="(max-width: 400px) 100vw, 400px"
              className="object-cover hover:opacity-90 hover:scale-105 transition-all duration-300"
            />
          )}
          <div className="absolute top-2 right-2">
            <HeartButton post={post} userId={user?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;

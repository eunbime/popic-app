import Image from "next/image";
import { useRouter } from "next/navigation";

import { TPostsWithAuthorAndLikes } from "@/types";
import useModal from "@/store/modal/modal-store";
import useUser from "@/store/user/user-store.";
import HeartButton from "../heart-button";

interface PostBoxProps {
  post: TPostsWithAuthorAndLikes;
}

const PostBox = ({ post }: PostBoxProps) => {
  const { user } = useUser();
  const router = useRouter();
  const { openModal, setType, setData } = useModal();

  const handlePostClick = () => {
    setType("post-view");
    setData({ post });
    openModal();
  };

  const handleAuthorClick = () => {
    router.push(`/gallery/${post.author.id}`);
  };

  return (
    <div className="w-full h-full flex gap-10">
      <div className="flex flex-col gap-2 items-center group h-fit">
        <div
          className="w-[80px] h-[80px] rounded-full overflow-hidden bg-gray-200 cursor-pointer"
          onClick={handleAuthorClick}
        >
          <Image
            src={post.author.image || "/images/default-profile.png"}
            alt="post"
            width={80}
            height={80}
            className="group-hover:opacity-70 transition-opacity duration-300"
          />
        </div>
        <p
          className="text-sm font-semibold text-gray-500 cursor-pointer group-hover:dark:text-white group-hover:text-black transition-colors duration-300"
          onClick={handleAuthorClick}
        >
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

import useModal from "@/store/modal/modal-store";
import { TPostsWithAuthor } from "@/types";
import Image from "next/image";

interface PostBoxProps {
  post: TPostsWithAuthor;
}

const PostBox = ({ post }: PostBoxProps) => {
  const { openModal, setType, setData } = useModal();

  const handleClick = () => {
    setType("post-view");
    setData(post);
    openModal();
  };

  return (
    <div className="w-full h-full flex gap-10">
      <div className="flex flex-col gap-2 items-center">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-gray-200">
          <Image
            src={
              post.author.image ||
              "https://via.placeholder.com/80x80?text=profile"
            }
            alt="post"
            width={80}
            height={80}
          />
        </div>
        <p className="text-sm font-semibold text-gray-500">
          {post.author.name}
        </p>
      </div>
      <div className="flex-1 w-full h-full flex flex-col">
        <div
          onClick={handleClick}
          className="w-[250px] h-[250px] rounded-md overflow-hidden bg-gray-400 cursor-pointer"
        >
          <Image
            src={
              post.imageUrl || "https://via.placeholder.com/250x250?text=image"
            }
            alt="post"
            width={250}
            height={250}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PostBox;

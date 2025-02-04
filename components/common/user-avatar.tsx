import { useRouter } from "next/navigation";
import Image from "next/image";

import { TAuthor } from "@/types";
import useModal from "@/store/modal/modal-store";

interface UserAvatarProps {
  image: string;
  author?: TAuthor;
}

const UserAvatar = ({ image, author }: UserAvatarProps) => {
  const router = useRouter();
  const { isOpen, closeModal } = useModal();

  const handleAuthorClick = () => {
    if (author) {
      if (isOpen) {
        closeModal();
      }
      router.push(`/gallery/${author.id}`);
    }
  };

  return (
    <div
      className="relative w-10 h-10 rounded-full overflow-hidden mr-2 cursor-pointer"
      onClick={handleAuthorClick}
    >
      {image && (
        <Image
          src={image}
          alt="author-avatar"
          fill
          sizes="40px"
          className="object-cover hover:opacity-80 transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export default UserAvatar;

import { useRouter } from "next/navigation";
import Image from "next/image";

import { TAuthor } from "@/types";
import useModal from "@/store/modal/modal-store";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  image: string;
  author?: TAuthor;
  size?: "sm" | "md" | "lg";
}

const UserAvatar = ({ image, author, size = "md" }: UserAvatarProps) => {
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
      className={cn(
        "relative w-10 h-10 rounded-full overflow-hidden mr-2 cursor-pointer",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-10 h-10",
        size === "lg" && "w-20 h-20"
      )}
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

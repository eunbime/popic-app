import Image from "next/image";

import axios from "axios";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TPostWithLikes } from "@/types";
import useModal from "@/store/modal/modal-store";
import { formatDateForTimeline } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";
import HeartButton from "@/components/heart-button";

interface TimelineBoxProps {
  post: TPostWithLikes;
  userId: string;
}

const TimelineBox = ({ post, userId }: TimelineBoxProps) => {
  const { openModal, setType, setData } = useModal();

  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/posts/${post.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-dates"] });
    },
  });

  const handleImageClick = () => {
    setType("post-view");
    openModal();
    setData({ post });
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setType("post-upload");
    openModal();
    setData({ post });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setType("delete-confirm");
    openModal();
    setData({ onConfirm: () => deletePost() });
  };

  return (
    <div
      className="w-[350px] h-[430px] mx-auto mt-5 group relative cursor-pointer"
      onClick={handleImageClick}
    >
      <p className="text-md font-bold">{formatDateForTimeline(post.date)}</p>
      <div className="w-[350px] h-[350px] overflow-hidden">
        <Image
          src={
            post.imageUrl || "https://via.placeholder.com/350x350?text=photo"
          }
          alt="gallery"
          width={350}
          height={350}
          className="object-cover"
        />
      </div>
      <p className="text-md text-semibold text-gray-500">{post.title}</p>
      <div className="absolute top-8 right-2">
        <HeartButton post={post} userId={userId} />
      </div>
      <div className="absolute flex gap-2 bottom-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button type="button" onClick={handleEdit}>
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={handleDelete} disabled={isDeletePending}>
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TimelineBox;

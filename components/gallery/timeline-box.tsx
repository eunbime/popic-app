import Image from "next/image";

import { Post } from "@prisma/client";
import { formatDateForTimeline } from "@/lib/formatDate";
import { Button } from "../ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import useModal from "@/store/modal/modal-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface TimelineBoxProps {
  post: Post;
}

const TimelineBox = ({ post }: TimelineBoxProps) => {
  const { openModal, setType, setData } = useModal();
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/posts/${post.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleClick = () => {
    console.log("!!!");
    setType("post-view");
    openModal();
    setData(post);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setType("post-upload");
    openModal();
    setData(post);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deletePost();
  };

  return (
    <div
      className="w-[350px] h-[430px] mx-auto mt-5 group relative cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-md font-bold">{formatDateForTimeline(post.date)}</p>
      <Image
        src={post.imageUrl || "https://via.placeholder.com/350x350?text=photo"}
        alt="gallery"
        width={350}
        height={350}
        className="object-cover"
      />
      <p className="text-md text-semibold text-gray-500">{post.title}</p>

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

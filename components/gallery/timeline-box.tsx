import Image from "next/image";

import { Post } from "@prisma/client";
import { formatDateForTimeline } from "@/lib/formatDate";
import { Button } from "../ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";

interface TimelineBoxProps {
  post: Post;
}

const TimelineBox = ({ post }: TimelineBoxProps) => {
  return (
    <div className="w-[350px] h-[430px] mx-auto mt-5 group relative">
      <p className="text-md font-bold">{formatDateForTimeline(post.date)}</p>
      <Image
        src={post.imageUrl || "https://via.placeholder.com/350x350?text=photo"}
        alt="gallery"
        width={350}
        height={350}
        className="object-cover"
      />
      <p className="text-sm text-gray-500">{post.title}</p>
      <p className="text-sm text-gray-500">{post.content}</p>
      <div className="absolute flex gap-2 bottom-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button>
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button>
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TimelineBox;

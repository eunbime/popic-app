"use client";

import { useQuery } from "@tanstack/react-query";

import { Post } from "@prisma/client";
import { getPostsByDate } from "@/api/posts";
import usePosts from "@/store/posts/posts-store";
import TimelineBox from "@/components/gallery/timeline-box";

interface TimelineProps {
  userId: string;
}

const Timeline = ({ userId }: TimelineProps) => {
  const { selectedDate } = usePosts();

  const { data: postsByDate } = useQuery<Post[]>({
    queryKey: ["posts-by-date", selectedDate],
    queryFn: () => getPostsByDate(selectedDate, userId),
    enabled: !!selectedDate,
  });

  return (
    <div className="w-full h-full flex flex-col">
      {postsByDate?.map((post: Post) => (
        <TimelineBox key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Timeline;

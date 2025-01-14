"use client";

import { useQuery } from "@tanstack/react-query";

import { TPostWithLikes } from "@/types";
import { getPostsByDate } from "@/api/posts";
import usePosts from "@/store/posts/posts-store";
import TimelineBox from "@/components/gallery/timeline-box";

interface TimelineProps {
  userId: string;
}

const Timeline = ({ userId }: TimelineProps) => {
  const { selectedDate } = usePosts();

  const { data: postsByDate } = useQuery<TPostWithLikes[]>({
    queryKey: ["posts-by-date", selectedDate],
    queryFn: () => getPostsByDate(selectedDate, userId),
    enabled: !!selectedDate,
  });

  return (
    <div className="w-full h-full flex flex-col">
      {postsByDate?.map((post: TPostWithLikes) => (
        <TimelineBox key={post.id} post={post} userId={userId} />
      ))}
    </div>
  );
};

export default Timeline;

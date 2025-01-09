"use client";

import axios from "axios";
import TimelineBox from "./timeline-box";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@prisma/client";

const Timeline = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axios.get("/api/posts"),
  });

  return (
    <div className="w-full h-full flex flex-col">
      {data?.data.map((post: Post) => (
        <TimelineBox key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Timeline;

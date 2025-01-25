import { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { TPostWithLikes } from "@/types";
import { getPostsByDate } from "@/api/posts";
import useUser from "@/store/user/user-store.";
import useModal from "@/store/modal/modal-store";

interface CalendarPostListProps {
  selectedDateForPost: Date | null;
}

const CalendarPostList = ({ selectedDateForPost }: CalendarPostListProps) => {
  const { user } = useUser();
  const { setType, setData, openModal } = useModal();

  const { data: postsByDate, refetch } = useQuery<TPostWithLikes[]>({
    queryKey: ["postsByDate", selectedDateForPost],
    queryFn: () => getPostsByDate(selectedDateForPost, user?.id || ""),
    enabled: !!selectedDateForPost && !!user?.id,
  });

  useEffect(() => {
    if (selectedDateForPost) {
      refetch();
    }
  }, [selectedDateForPost, refetch]);

  const handlePostClick = (post: TPostWithLikes) => {
    setType("post-view");
    setData({ post });
    openModal();
  };

  return (
    <div className="grid  grid-cols-4 gap-4 p-4">
      {postsByDate?.map((post) => (
        <div key={post.id}>
          <div
            className="w-[80px] h-[80px] rounded-md overflow-hidden cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <Image
              src={post.imageUrl || ""}
              alt={post.title}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarPostList;

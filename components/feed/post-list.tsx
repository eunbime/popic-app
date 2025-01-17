import { useRef } from "react";

import { useSearchParams } from "next/navigation";
import { useInfinitePosts } from "@/hooks/use-infinite-posts";
import PostBox from "@/components/feed/post-box";

const PostList = () => {
  const searchParams = useSearchParams();
  const selectedFilter = searchParams.get("filter");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { posts, status } = useInfinitePosts({
    selectedFilter,
    observerRef,
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <div className="w-full h-full flex flex-col gap-10 px-7 pt-7">
      {posts?.pages.map((group) =>
        group.map((post) => <PostBox key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostList;

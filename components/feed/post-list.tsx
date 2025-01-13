import PostBox from "./post-box";
import { getFeedPosts } from "@/api/posts";
import { TPostsWithAuthorAndLikes } from "@/types";
import { useQuery } from "@tanstack/react-query";

const PostList = () => {
  const { data: posts, isLoading } = useQuery<TPostsWithAuthorAndLikes[]>({
    queryKey: ["feedPosts"],
    queryFn: getFeedPosts,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-full flex flex-col gap-10 px-7 pt-7">
      {posts?.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;

import { TPostsWithAuthorAndLikes } from "@/types";
import { useInfinitePostsByFilter } from "@/hooks/posts/useInfinitePostsByFilter";
import PostBox from "@/components/feed/post-box";

interface SearchPostListProps {
  keyword: string;
  order: string;
}

const SearchPostList = ({ keyword, order }: SearchPostListProps) => {
  const { data } = useInfinitePostsByFilter(keyword, order);

  return (
    <div className="w-[80%] pb-20">
      {data?.pages.map((page: TPostsWithAuthorAndLikes[], index: number) => (
        <div key={index} className="h-full flex flex-col gap-3">
          {page.map((post) => (
            <div key={post.id}>
              <PostBox post={post} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SearchPostList;

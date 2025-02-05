import { useInfiniteQuery } from "@tanstack/react-query";

import { getSearchPostList } from "@/api/posts";
import { TPostsWithAuthorAndLikes } from "@/types";
import PostBox from "../feed/post-box";

interface SearchPostListProps {
  keyword: string;
  order: string;
}

const SearchPostList = ({ keyword, order }: SearchPostListProps) => {
  const { data } = useInfiniteQuery({
    queryKey: ["search-post-list", keyword, order],
    queryFn: () => getSearchPostList(keyword, 10, 0, order),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length * 10 : undefined;
    },
    initialPageParam: 0,
    enabled: !!keyword,
  });

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

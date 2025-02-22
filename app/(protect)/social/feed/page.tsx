import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { TPostsWithAuthorAndLikes } from "@/types";
import { auth } from "@/lib/auth";
import { getPostsByDate } from "@/api/posts";
import PostList from "@/components/feed/post-list";

export default async function Feed() {
  const session = await auth();
  const queryClient = new QueryClient();
  const date = new Date();

  await queryClient.prefetchInfiniteQuery<TPostsWithAuthorAndLikes[]>({
    queryKey: ["posts", "all"],
    queryFn: async ({ pageParam = 1 }) => {
      return getPostsByDate(date, session?.user?.id, pageParam as number, 5);
    },
    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full h-full md:px-10">
        <PostList />
      </div>
    </HydrationBoundary>
  );
}

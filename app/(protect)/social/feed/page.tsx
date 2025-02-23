import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { auth } from "@/lib/auth";
import { prefetchFeedPosts } from "@/hooks/posts/useFeedPosts";
import PostList from "@/components/feed/post-list";

export default async function Feed() {
  const session = await auth();
  const queryClient = new QueryClient();
  const date = new Date();

  await prefetchFeedPosts(date, session?.user?.id, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full h-full md:px-10">
        <PostList />
      </div>
    </HydrationBoundary>
  );
}

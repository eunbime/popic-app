import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { prefetchListPosts } from "@/hooks/posts/useLikePosts";
import LikePostList from "@/components/like/like-post-list";

export default async function Like() {
  const queryClient = new QueryClient();

  await prefetchListPosts(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full h-full">
        <LikePostList />
      </div>
    </HydrationBoundary>
  );
}

import { getLikePosts } from "@/api/posts";
import LikePostList from "@/components/like/like-post-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Like() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["like-posts", "all"],
    queryFn: () => getLikePosts("all"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full h-full">
        <LikePostList />
      </div>
    </HydrationBoundary>
  );
}

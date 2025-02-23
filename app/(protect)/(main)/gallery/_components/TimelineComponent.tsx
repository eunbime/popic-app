import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Timeline from "@/components/gallery/timeline";
import { prefetchInfiniteTimelinePosts } from "@/hooks/posts/useInfiniteTimelinePosts";

interface TimelineComponentProps {
  userId: string;
}

export default async function TimelineComponent({
  userId,
}: TimelineComponentProps) {
  const queryClient = new QueryClient();
  const date = new Date();

  await prefetchInfiniteTimelinePosts(userId, date, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Timeline userId={userId} />
    </HydrationBoundary>
  );
}

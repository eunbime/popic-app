import { getPostsByDate } from "@/api/posts";
import Timeline from "@/components/gallery/timeline";
import { TPostsWithAuthorAndLikes } from "@/types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

interface TimelineComponentProps {
  userId: string;
}

export default async function TimelineComponent({
  userId,
}: TimelineComponentProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: true,
      },
    },
  });
  const date = new Date();

  await queryClient.prefetchInfiniteQuery<TPostsWithAuthorAndLikes[]>({
    queryKey: ["posts", date],
    queryFn: async ({ pageParam = 1 }) => {
      console.log({ date });
      return getPostsByDate(date, userId, pageParam as number, 5);
    },
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Timeline userId={userId} />
      </Suspense>
    </HydrationBoundary>
  );
}

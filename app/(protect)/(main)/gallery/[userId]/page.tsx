import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CarouselBox from "@/components/gallery/carousel-box";
import Profile from "@/components/gallery/profile";
import TimelineComponent from "../_components/TimelineComponent";
import { prefetchUserById } from "@/hooks/user/userUserById";
import { Suspense } from "react";
import CarouselSkeleton from "@/components/skeleton/carousel-skeleton";
import TimelineSkeleton from "@/components/skeleton/timeline-skeleton";
import ProfileSkeleton from "@/components/skeleton/profile-skeleton";

interface PageParams {
  userId: string;
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const queryClient = new QueryClient();
  const { userId } = await params;
  await prefetchUserById(userId, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="!flex !flex-col md:!flex-row w-full h-full gap-0 md:gap-8 p-0 md:px-10">
        <div className="flex flex-col w-full md:w-1/2 min-h-full">
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile userId={userId} />
          </Suspense>
          <Suspense fallback={<CarouselSkeleton />}>
            <CarouselBox userId={userId} />
          </Suspense>
        </div>
        <div className="w-full md:w-1/2 min-h-full overflow-y-auto">
          <Suspense fallback={<TimelineSkeleton />}>
            <TimelineComponent userId={userId} />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
}

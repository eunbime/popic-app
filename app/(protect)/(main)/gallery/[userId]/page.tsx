import { getUserById } from "@/api/user";
import CarouselBox from "@/components/gallery/carousel-box";
import Profile from "@/components/gallery/profile";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TimelineComponent from "../_components/TimelineComponent";

type PageParams = Promise<{ userId: string }>;

export default async function GalleryPage({ params }: { params: PageParams }) {
  const queryClient = new QueryClient();

  const { userId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="!flex !flex-col md:!flex-row w-full h-full gap-0 md:gap-8 p-0 md:px-10">
        <div className="flex flex-col w-full md:w-1/2 min-h-full">
          <Profile userId={userId} />
          <CarouselBox userId={userId} />
        </div>
        <div className="w-full md:w-1/2 min-h-full overflow-y-auto">
          <TimelineComponent userId={userId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}

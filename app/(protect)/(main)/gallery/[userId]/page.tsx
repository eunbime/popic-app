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
      <div className="flex flex-col w-full h-full">
        <Profile userId={userId} />
        <div className="w-full h-full">
          <CarouselBox userId={userId} />
          <TimelineComponent userId={userId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}

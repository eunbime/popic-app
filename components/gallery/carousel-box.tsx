import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { prefetchCarouselPosts } from "@/hooks/posts/useInfiniteCarouselPosts";
import Carousel from "@/components/gallery/carousel";

interface CarouselBoxProps {
  userId: string;
}

const CarouselBox = async ({ userId }: CarouselBoxProps) => {
  const queryClient = new QueryClient();
  await prefetchCarouselPosts(userId, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full h-[100px] justify-between">
        <Carousel userId={userId} />
      </div>
    </HydrationBoundary>
  );
};

export default CarouselBox;

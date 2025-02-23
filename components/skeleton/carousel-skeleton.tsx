import { Skeleton } from "../ui/skeleton";

const CarouselSkeleton = () => {
  return (
    <div className="w-[calc(100%-60px)] max-w-[380px] h-[80px] mx-auto flex items-center justify-center gap-2">
      <Skeleton className="w-full h-full bg-gray-200 dark:bg-muted-foreground" />
      <Skeleton className="w-full h-full bg-gray-200 dark:bg-muted-foreground" />
      <Skeleton className="w-full h-full bg-gray-200 dark:bg-muted-foreground" />
      <Skeleton className="w-full h-full bg-gray-200 dark:bg-muted-foreground" />
    </div>
  );
};

export default CarouselSkeleton;

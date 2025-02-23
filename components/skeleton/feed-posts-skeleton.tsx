import { Skeleton } from "../ui/skeleton";

const FeedPostsSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10 px-7 pt-7">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-full h-full flex gap-10">
          <div className="flex flex-col gap-2 items-center group h-fit">
            <Skeleton className="w-[80px] h-[80px] rounded-full bg-gray-200 dark:bg-muted-foreground" />
            <Skeleton className="h-5 w-[80px] bg-gray-200 dark:bg-muted-foreground" />
          </div>
          <div className="grid grid-cols-1 w-full h-full">
            <Skeleton className="w-full max-w-[400px] aspect-square rounded-md bg-gray-200 dark:bg-muted-foreground" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedPostsSkeleton;

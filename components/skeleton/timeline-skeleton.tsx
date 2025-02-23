import { Skeleton } from "../ui/skeleton";

const TimelineSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-[350px] h-[430px] mx-auto mt-5 group relative cursor-pointer flex flex-col item-start gap-2"
        >
          <Skeleton className="h-7 w-[250px] bg-gray-200 dark:bg-muted-foreground" />
          <Skeleton className="w-[350px] h-[350px] bg-gray-200 dark:bg-muted-foreground" />
          <Skeleton className="h-4 w-[250px] bg-gray-200 dark:bg-muted-foreground" />
        </div>
      ))}
    </div>
  );
};

export default TimelineSkeleton;

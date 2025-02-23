import { Skeleton } from "../ui/skeleton";

const LikePostsSkeleton = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-7">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-[110px] h-[110px] rounded-sm bg-gray-200 dark:bg-muted-foreground"
        />
      ))}
    </div>
  );
};

export default LikePostsSkeleton;

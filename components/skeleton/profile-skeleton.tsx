import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="w-full py-5">
      <div className="max-w-[350px] h-full mx-auto flex flex-col gap-3 ">
        <div className="flex justify-between items-center">
          <Skeleton className="relative w-[100px] h-[100px] bg-gray-200 rounded-lg" />
          <div className="flex flex-col w-[230px] h-[100px] bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 gap-2">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-5 w-[200px]" />
            <Skeleton className="h-5 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex w-[100px] justify-center items-center ">
            <Skeleton className="h-7 w-[100px] bg-gray-200 dark:bg-muted-foreground" />
          </div>
          <div className="flex justify-around w-[230px]">
            <Skeleton className="h-7 w-[100px] bg-gray-200 dark:bg-muted-foreground" />
            <Skeleton className="h-7 w-[100px] bg-gray-200 dark:bg-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

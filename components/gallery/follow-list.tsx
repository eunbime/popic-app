import { User } from "@prisma/client";
import FollowProfileBox from "./follow-profile-box";
import { Skeleton } from "../ui/skeleton";

interface FollowListProps {
  listData: User[];
  isLoading: boolean;
}

const FollowList = ({ listData, isLoading }: FollowListProps) => {
  if (isLoading)
    return (
      <div className="w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="w-full">
            <div className="flex items-center justify-center py-2 gap-2 w-full px-10">
              <Skeleton className="relative min-w-[50px] min-h-[50px] rounded-full" />
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="w-full">
      {listData?.map((user) => (
        <div key={user.id} className="w-full divide-y-2">
          <FollowProfileBox user={user} />
        </div>
      ))}
    </div>
  );
};

export default FollowList;

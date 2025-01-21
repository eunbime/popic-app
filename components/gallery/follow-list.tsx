import { User } from "@prisma/client";
import FollowProfileBox from "./follow-profile-box";

interface FollowListProps {
  listData: User[];
}

const FollowList = ({ listData }: FollowListProps) => {
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

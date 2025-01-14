import { User } from "@prisma/client";
import FollowProfileBox from "./follow-profile-box";

interface FollowListProps {
  listData: User[];
}

const FollowList = ({ listData }: FollowListProps) => {
  return (
    <div className="w-full">
      {listData?.map((user) => (
        <FollowProfileBox key={user.id} user={user} />
      ))}
    </div>
  );
};

export default FollowList;

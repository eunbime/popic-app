import { User } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/button";

interface FollowProfileBoxProps {
  user: User;
}

const FollowProfileBox = ({ user }: FollowProfileBoxProps) => {
  return (
    <div className="flex items-center justify-center gap-2 w-full px-10">
      {/* 프로필 이미지 */}
      <div className="min-w-[50px] min-h-[50px] rounded-full overflow-hidden">
        <Image
          src={user.image as string}
          alt={user.name as string}
          width={50}
          height={50}
        />
      </div>
      {/* 이름 */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">{user.name}</div>
          {/* 팔로우 버튼 */}
          <Button variant="secondary" className="text-sm text-gray-500 h-6">
            팔로우
          </Button>
        </div>
        <div className="text-sm text-gray-500">{user.bio || "No bio"}</div>
      </div>
    </div>
  );
};

export default FollowProfileBox;

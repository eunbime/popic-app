import { User } from "@prisma/client";
import Image from "next/image";
import FollowButton from "./follow-button";
import useUser from "@/store/user/user-store.";
import { useRouter } from "next/navigation";

interface FollowProfileBoxProps {
  user: User;
}

const FollowProfileBox = ({ user }: FollowProfileBoxProps) => {
  const { user: currentUser } = useUser();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/gallery/${user.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-center py-2 gap-2 w-full px-10 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer"
    >
      {/* 프로필 이미지 */}
      <div className="relative min-w-[50px] min-h-[50px] rounded-full overflow-hidden">
        <Image
          src={user.image || "/images/default-profile.png"}
          alt={user.name as string}
          fill
          className="object-cover w-full h-full"
        />
      </div>
      {/* 이름 */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">{user.name}</div>
          {/* 팔로우 버튼 */}
          {currentUser?.id !== user.id && <FollowButton userId={user.id} />}
        </div>
        <div className="text-sm text-gray-500">{user.bio || "No bio"}</div>
      </div>
    </div>
  );
};

export default FollowProfileBox;

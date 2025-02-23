"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useUser from "@/store/user/user-store.";
import { useUserById } from "@/hooks/user/userUserById";
import { Button } from "@/components/ui/button";
import FollowButton from "@/components/gallery/follow-button";
import ProfileSkeleton from "../skeleton/profile-skeleton";

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps) => {
  const { user } = useUser();
  const router = useRouter();

  const { data: userData, isLoading } = useUserById(userId);

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="w-full py-5">
      <div className="max-w-[350px] h-full mx-auto flex flex-col gap-3 ">
        <div className="flex justify-between items-center">
          <div className="relative w-[100px] h-[100px] bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={userData?.image || "/images/default-profile.png"}
              alt="profile"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col w-[230px] h-[100px] bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 gap-2">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {userData?.name}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userData?.bio || "한줄 소개를 입력해주세요."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex w-[100px] justify-center items-center ">
            {userId === user?.id ? (
              <Button
                variant="basic"
                className="h-7 font-semibold text-gray-700 bg-gray-200 dark:bg-gray-600 hover:dark:bg-gray-700 dark:text-gray-200"
                onClick={() => router.push("/settings/profile")}
              >
                프로필 수정
              </Button>
            ) : (
              <FollowButton userId={userId} />
            )}
          </div>
          <div className="flex justify-around w-[230px]">
            <Link href={`/gallery/${userId}/follower`}>
              <span>팔로워</span>
            </Link>
            <Link href={`/gallery/${userId}/following`}>
              <span>팔로잉</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

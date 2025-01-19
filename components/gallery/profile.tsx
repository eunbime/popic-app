"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/user";
import { Button } from "../ui/button";
import useUser from "@/store/user/user-store.";
import Link from "next/link";
import FollowButton from "./follow-button";
import { useRouter } from "next/navigation";

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps) => {
  const { user } = useUser();
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(userId),
  });

  return (
    <div className="w-full py-5">
      <div className="max-w-[350px] h-full mx-auto flex flex-col gap-3 ">
        <div className="flex justify-between items-center">
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={
                userData?.image ??
                "https://via.placeholder.com/100x100?text=profile"
              }
              alt="profile"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col w-[230px] h-[100px] bg-gray-200 rounded-lg px-4 py-3 gap-2">
            <span className="text-sm font-bold text-gray-900">
              {userData?.name}
            </span>
            <p className="text-sm text-gray-500 ">
              {userData?.bio ?? "바이오가 작성되지 않았습니다."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex w-[100px] justify-center items-center ">
            {userId === user?.id ? (
              <Button
                variant="secondary"
                className="h-6"
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

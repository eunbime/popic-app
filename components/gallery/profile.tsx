"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/user";
import { Button } from "../ui/button";
import useUser from "@/store/user/user-store.";
import Link from "next/link";
import FollowButton from "./follow-button";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps) => {
  const { user } = useUser();
  const router = useRouter();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(userId),
  });

  if (isLoading)
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

  return (
    <div className="w-full py-5">
      <div className="max-w-[350px] h-full mx-auto flex flex-col gap-3 ">
        <div className="flex justify-between items-center">
          <div className="relative w-[100px] h-[100px] bg-gray-200 rounded-lg overflow-hidden">
            {userData?.image ? (
              <Image
                src={userData?.image as string}
                alt="profile"
                fill
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg"></div>
            )}
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

"use client";

import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkFollowing,
  followUser,
  getUserById,
  unfollowUser,
} from "@/api/user";
import { Button } from "../ui/button";
import useUser from "@/store/user/user-store.";

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps) => {
  const queryClient = useQueryClient();

  const { user } = useUser();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(userId),
  });

  //팔로우 체크
  const { data: isFollowing } = useQuery({
    queryKey: ["following", userId],
    queryFn: () => checkFollowing(userId),
    enabled: !!user && user.id !== userId,
  });

  // 팔로우/언팔로우
  const { mutate: toggleFollow } = useMutation({
    mutationFn: async () => {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["following", userId] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
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
              <Button variant="secondary" className="h-6">
                프로필 수정
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="h-6"
                onClick={() => toggleFollow()}
              >
                {isFollowing ? "언팔로우" : "팔로우"}
              </Button>
            )}
          </div>
          <div className="flex justify-around w-[230px]">
            <span>팔로워</span>
            <span>팔로잉</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

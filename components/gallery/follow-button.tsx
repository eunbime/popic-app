import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { checkFollowing, followUser, unfollowUser } from "@/api/user";
import useUser from "@/store/user/user-store.";

interface FollowButtonProps {
  userId: string;
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const queryClient = useQueryClient();

  const { user } = useUser();

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
      queryClient.invalidateQueries({ queryKey: ["followingList"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFollow();
  };

  return (
    <Button variant="secondary" className="h-6" onClick={handleClick}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

export default FollowButton;

import { User } from "@prisma/client";
import axios from "axios";

export const getUser = async (): Promise<User> => {
  const res = await axios.get("/api/user");
  return res.data.user;
};

export const getUserById = async (userId: string): Promise<User> => {
  const isServer = typeof window === "undefined";

  const baseUrl = isServer
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`
    : `/api/user/${userId}`;

  const res = await axios.get(baseUrl, {
    ...(isServer && {
      headers: {
        "Cache-Control": "no-store",
      },
    }),
  });
  return res.data.user;
};

export const checkFollowing = async (userId: string): Promise<boolean> => {
  const { data } = await axios.get(`/api/user/${userId}/following`);
  return data;
};

export const followUser = async (userId: string): Promise<void> => {
  const { data } = await axios.post(`/api/user/${userId}/follow`);
  return data;
};

export const unfollowUser = async (userId: string): Promise<void> => {
  const { data } = await axios.post(`/api/user/${userId}/unfollow`);
  return data;
};

export const getFollowingList = async (userId: string): Promise<User[]> => {
  const { data } = await axios.get(`/api/user/${userId}/following-list`);
  return data;
};

export const getFollowerList = async (userId: string): Promise<User[]> => {
  const { data } = await axios.get(`/api/user/${userId}/follower-list`);
  return data;
};

export const getSearchUserList = async (
  keyword: string,
  limit: number,
  offset: number,
  sort: string
): Promise<User[]> => {
  const { data } = await axios.get(`/api/user/search`, {
    params: {
      keyword,
      limit,
      offset,
      sort,
    },
  });
  return data;
};

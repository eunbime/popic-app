import { TPostsWithAuthorAndLikes, TPostWithLikes } from "@/types";
import { Post } from "@prisma/client";
import axios from "axios";

interface DateGroup {
  date: Date;
  count: number;
  thumbnailUrl: string | null;
}

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get("/api/posts");
  return data;
};

export const getPostsByUserId = async (userId?: string): Promise<Post[]> => {
  const { data } = await axios.get(`/api/posts/by-user/${userId}`);
  return data;
};

export const getPostsByDate = async (
  date: Date | null,
  userId: string
): Promise<TPostWithLikes[]> => {
  const { data } = await axios.get("/api/posts/by-date", {
    params: {
      date: date,
      userId: userId,
    },
  });
  return data;
};

export const getDateGroups = async (): Promise<DateGroup[]> => {
  const { data } = await axios.get("/api/posts/date-groups");
  return data;
};

export const getDateGroupsByUserId = async (
  userId: string
): Promise<DateGroup[]> => {
  const { data } = await axios.get(`/api/posts/date-groups/${userId}`);
  return data;
};

export const getFeedPosts = async (): Promise<TPostsWithAuthorAndLikes[]> => {
  const { data } = await axios.get("/api/posts/feed");
  return data;
};

export const getLikePosts = async (): Promise<TPostsWithAuthorAndLikes[]> => {
  const { data } = await axios.get("/api/posts/like");
  return data;
};

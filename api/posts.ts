import { TPostsWithAuthor } from "@/types";
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

export const getPostsByDate = async (
  date: Date | null,
  userId: string
): Promise<Post[]> => {
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

export const getFeedPosts = async (): Promise<TPostsWithAuthor[]> => {
  const { data } = await axios.get("/api/posts/feed");
  return data;
};

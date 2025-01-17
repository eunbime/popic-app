import axios from "axios";

import { Post } from "@prisma/client";
import { TPostsWithAuthorAndLikes } from "@/types";

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
  userId?: string | null,
  page: number = 1,
  limit: number = 5
): Promise<TPostsWithAuthorAndLikes[]> => {
  const skip = (page - 1) * limit;

  const { data } = await axios.get("/api/posts/by-date", {
    params: {
      date: date,
      userId: userId,
      skip,
      limit,
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

export const getFeedPosts = async (
  filter?: string | null,
  skip: number = 0,
  take: number = 5
): Promise<TPostsWithAuthorAndLikes[]> => {
  const { data } = await axios.get("/api/posts/feed", {
    params: {
      filter,
      skip,
      take,
    },
  });
  return data;
};

export const getLikePosts = async (
  filter: string | null
): Promise<TPostsWithAuthorAndLikes[]> => {
  const { data } = await axios.get("/api/posts/like", {
    params: {
      filter,
    },
  });
  return data;
};

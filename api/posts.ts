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
  const isServer = typeof window === "undefined";

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/by-user/${userId}`,
    {
      ...(isServer && {
        headers: {
          "Cache-Control": "no-store",
        },
      }),
    }
  );
  return data;
};

export const getPostsByDate = async (
  date: Date | null,
  userId?: string | null,
  page: number = 1,
  limit: number = 5
): Promise<TPostsWithAuthorAndLikes[]> => {
  const skip = (page - 1) * limit;
  const isServer = typeof window === "undefined";

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/by-date`,
    {
      params: {
        date: date,
        userId: userId,
        skip,
        limit,
      },
      ...(isServer && {
        headers: {
          "Cache-Control": "no-store",
        },
      }),
    }
  );
  return data;
};

export const getDateGroupsByUserId = async (
  userId: string,
  beforeDate?: Date | undefined
): Promise<DateGroup[]> => {
  const { data } = await axios.get(`/api/posts/date-groups/${userId}`, {
    params: {
      beforeDate: beforeDate?.toISOString(),
    },
  });
  return data;
};

export const getFeedPosts = async (
  filter?: string | null,
  page: number = 1,
  limit: number = 5
): Promise<TPostsWithAuthorAndLikes[]> => {
  const skip = (page - 1) * limit;
  const { data } = await axios.get("/api/posts/feed", {
    params: {
      filter,
      skip,
      limit,
    },
  });
  return data;
};

export const getLikePosts = async (
  filter: string | null
): Promise<TPostsWithAuthorAndLikes[]> => {
  const isServer = typeof window === "undefined";

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/like`,
    {
      params: {
        filter,
      },
      ...(isServer && {
        headers: {
          "Cache-Control": "no-store",
        },
      }),
    }
  );
  return data;
};

export const getSearchPostList = async (
  keyword: string,
  limit: number,
  skip: number,
  order: string
): Promise<TPostsWithAuthorAndLikes[]> => {
  const { data } = await axios.get("/api/posts/search", {
    params: { keyword, limit, skip, order },
  });
  return data;
};

import { Like, Post } from "@prisma/client";

export type TPostsWithAuthorAndLikes = Post & {
  author: {
    id: string;
    name: string;
    image: string;
  };
  likes: Like[];
};

export type TPostWithLikes = Post & {
  likes: Like[];
};

import { Post } from "@prisma/client";

export type TPostsWithAuthor = Post & {
  author: {
    id: string;
    name: string;
    image: string;
  };
};

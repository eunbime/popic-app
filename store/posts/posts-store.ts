import { Post } from "@prisma/client";
import { create } from "zustand";

interface PostsState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const usePosts = create<PostsState>()((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default usePosts;

import { User } from "@prisma/client";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUser = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUser;

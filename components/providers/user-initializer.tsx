"use client";

import useUser from "@/store/user/user-store.";
import { User } from "@prisma/client";
import { useEffect } from "react";

export const UserInitializer = ({ user }: { user: User | null }) => {
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
};

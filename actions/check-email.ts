"use server";

import { getUserByEmail } from "@/data/user";

export const checkEmail = async (email: string) => {
  const existingUser = await getUserByEmail(email);
  return !!existingUser;
};

"use server";

import { getUserByEmail } from "@/data/user";
import { signIn } from "@/lib/auth";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "이메일이 존재하지 않습니다.",
    };
  }

  if (!existingUser?.password) {
    return { error: "이메일 또는 비밀번호가 일치하지 않습니다." };
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordsMatch) {
    return { error: "이메일 또는 비밀번호가 일치하지 않습니다." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "로그인이 성공했습니다." };
  } catch (error) {
    console.log(error);
    return { error: "알 수 없는 오류가 발생했습니다." };
  }
};

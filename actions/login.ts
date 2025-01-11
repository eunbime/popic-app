"use client";

import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { signIn } from "next-auth/react";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
    return {
      success: "Login successful",
    };
  } catch (error) {
    console.log("Login Error", error);
  }

  return { error: "Something went wrong" };
};

import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const PostUploadSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "content is required",
  }),
  date: z.date().optional(),
  imageUrl: z
    .string({
      required_error: "이미지를 업로드해주세요.",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "이미지를 업로드해주세요.",
    }),
  isPrivate: z.boolean(),
  id: z.string().optional(),
});

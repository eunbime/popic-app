import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "이메일 형식이 올바르지 않습니다.",
  }),
  password: z.string().min(1, {
    message: "비밀번호는 필수 입력 항목입니다.",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "이메일 형식이 올바르지 않습니다.",
  }),
  password: z.string().min(6, {
    message: "비밀번호는 최소 6자 이상이어야 합니다.",
  }),
  name: z.string().min(1, {
    message: "이름은 필수 입력 항목입니다.",
  }),
});

export const PostUploadSchema = z.object({
  title: z.string().min(1, {
    message: "제목은 필수 입력 항목입니다.",
  }),
  content: z.string().min(1, {
    message: "내용은 필수 입력 항목입니다.",
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

export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  bio: z.string().optional(),
  image: z
    .string({
      required_error: "이미지를 업로드해주세요.",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "이미지를 업로드해주세요.",
    })
    .nullable(),
});

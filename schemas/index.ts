import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "이메일 형식이 올바르지 않습니다.",
  }),
  password: z.string().min(1, {
    message: "비밀번호는 필수 입력 항목입니다.",
  }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "이메일 형식이 올바르지 않습니다.",
    }),
    password: z.string().min(6, {
      message: "비밀번호는 최소 6자 이상이어야 합니다.",
    }),
    passwordConfirm: z.string().min(6, {
      message: "비밀번호는 최소 6자 이상이어야 합니다.",
    }),
    name: z
      .string()
      .min(1, {
        message: "이름은 필수 입력 항목입니다.",
      })
      .max(20, {
        message: "이름은 최대 20자까지 입력할 수 있습니다.",
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export const PostUploadSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "제목은 필수 입력 항목입니다.",
    })
    .max(30, {
      message: "제목은 최대 30자까지 입력할 수 있습니다.",
    }),
  content: z
    .string()
    .min(1, {
      message: "내용은 필수 입력 항목입니다.",
    })
    .max(500, {
      message: "내용은 최대 500자까지 입력할 수 있습니다.",
    }),
  date: z.date().optional(),
  imageUrl: z
    .string({
      required_error: "이미지를 업로드해주세요.",
    })
    .min(1, {
      message: "이미지를 업로드해주세요.",
    }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "태그는 최소 1자 이상이어야 합니다." })
        .max(10, { message: "태그는 10자를 초과할 수 없습니다." })
        .regex(/^[가-힣a-zA-Z0-9]+$/, {
          message: "태그는 한글, 영문, 숫자만 가능합니다.",
        })
    )
    .max(10, { message: "태그는 최대 10개까지만 추가할 수 있습니다." })
    .optional(),
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

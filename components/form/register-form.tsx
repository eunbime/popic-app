"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "onChange",
  });

  const { errors } = form.formState;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values = form.getValues();

    if (step === 1) {
      const emailSchema = z.object({
        email: RegisterSchema.shape.email,
      });

      const result = emailSchema.safeParse({ email: values.email });
      if (!result.success) {
        form.setError("email", { message: "이메일 형식이 올바르지 않습니다." });
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      const passwordSchema = z.object({
        password: RegisterSchema.shape.password,
      });

      const result = passwordSchema.safeParse({ password: values.password });
      if (!result.success) {
        form.setError("password", {
          message: "비밀번호는 6자 이상이어야 합니다.",
        });
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      const result = RegisterSchema.safeParse(values);
      if (!result.success) {
        form.setError("name", {
          message: "이름은 필수 입력 항목입니다.",
        });
        return;
      }

      startTransition(async () => {
        try {
          await register(values);
          router.push("/auth/login");
        } catch (error) {
          console.log(error);
        }
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center text-black dark:text-white gap-4"
    >
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold">이메일을 입력하세요</h2>
          <Input {...form.register("email")} type="email" placeholder="Email" />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold">비밀번호를 입력하세요</h2>
          <Input
            {...form.register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-semibold">이름을 입력하세요</h2>
          <Input {...form.register("name")} type="text" placeholder="Name" />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </>
      )}

      <div className="flex gap-2">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
          >
            이전
          </Button>
        )}
        <Button type="submit" variant="ghost" disabled={isPending}>
          {step === 3 ? "가입하기" : "다음"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { useTransition, useState } from "react";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";

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

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    console.log("Form submitted", data, step);

    if (step === 3) {
      startTransition(async () => {
        try {
          await register(data);
          router.push("/auth/login");
        } catch (error) {
          console.log(error);
        }
      });
      return;
    }

    setStep(step + 1);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
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

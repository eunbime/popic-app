"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useTransition } from "react";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      startTransition(async () => {
        const response = await login(data);
        if (response.success) {
          router.push("/");
        } else {
          form.setError("email", { message: response.error });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        form.setError("email", { message: error.message });
      } else {
        form.setError("email", { message: "알 수 없는 오류가 발생했습니다." });
      }
    }
  };

  return (
    <form
      className="flex flex-col w-full items-center justify-center text-black dark:text-white gap-6"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="flex flex-col gap-3 w-[70%]">
        <Input type="text" placeholder="Email" {...form.register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...form.register("password")}
        />
        {form.formState.errors.email && (
          <p className="text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>
      <Button
        variant="basic"
        type="submit"
        className="w-[70%]"
        disabled={isPending}
      >
        로그인하기
      </Button>
    </form>
  );
};

export default LoginForm;

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
      console.log(data, error);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center text-black dark:text-white gap-4"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Input type="text" placeholder="Email" {...form.register("email")} />
      <Input
        type="password"
        placeholder="Password"
        {...form.register("password")}
      />
      {form.formState.errors.email && (
        <p className="text-red-500">{form.formState.errors.email.message}</p>
      )}
      <Button variant="ghost" type="submit" disabled={isPending}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

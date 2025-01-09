"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useTransition } from "react";
import { login } from "@/actions/login";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    console.log(data);

    try {
      startTransition(async () => {
        const response = await login(data);
        console.log(response);
      });
    } catch (error) {
      console.log(data);
      console.log(error);
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
      <Button variant="ghost" type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      startTransition(async () => {
        const response = await register(data);

        router.push("/auth/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center text-black dark:text-white gap-4"
    >
      <Input {...form.register("email")} type="text" placeholder="Email" />
      <Input
        {...form.register("password")}
        type="password"
        placeholder="Password"
      />
      <Input
        {...form.register("name")}
        type="password"
        placeholder="Confirm Password"
      />
      <Button variant="ghost" type="submit" disabled={isPending}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;

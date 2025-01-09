"use client";

import LoginForm from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl font-bold text-black dark:text-white">Login</h1>
      <LoginForm />
    </div>
  );
}

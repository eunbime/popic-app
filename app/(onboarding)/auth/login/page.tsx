"use client";

import LoginForm from "@/components/form/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <h1 className="text-2xl font-bold text-black dark:text-white pb-5">
        로그인
      </h1>
      <LoginForm />
      <p className="text-sm text-gray-500 mt-5">
        아직 회원이 아니신가요?{" "}
        <Link href="/auth/register" className="text-gray-300 font-semibold">
          회원가입
        </Link>
      </p>
    </div>
  );
}

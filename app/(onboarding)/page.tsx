import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import GoogleSigninButton from "@/components/auth/social/google-signin-button";

export default async function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-[400px]">
      <h1 className="text-3xl font-bold">Welcome to popic</h1>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded-md">
          <IoMail />
          <Link href="/auth/login">이메일로 로그인하기</Link>
        </div>

        <div className="flex items-center gap-2 bg-red-500 text-white p-2 rounded-md">
          <FaGoogle />
          <GoogleSigninButton />
        </div>
        <p className="text-sm text-gray-500 mt-5">
          아직 회원이 아니신가요? <Link href="/auth/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

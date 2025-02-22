import Link from "next/link";
import { IoMail } from "react-icons/io5";

import GoogleSigninButton from "@/components/auth/social/google-signin-button";

export default async function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-[400px]">
      <h1 className="text-3xl font-bold">Welcome to popic</h1>
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-[60%] max-w-[400px] flex flex-col gap-4">
          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-3 bg-white text-black p-2 rounded-md shadow-md border border-gray-200 hover:bg-gray-200 transition-all duration-300"
          >
            <IoMail />
            <span>이메일로 로그인하기</span>
          </Link>

          <GoogleSigninButton />
        </div>
        <p className="text-sm text-gray-500 mt-5">
          아직 회원이 아니신가요?{" "}
          <Link
            href="/auth/register"
            className="text-gray-600 dark:text-gray-300 font-semibold"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

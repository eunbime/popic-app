"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AuthError = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">인증 오류</h1>
        <p className="text-gray-500">
          로그인이 필요하거나 접근 권한이 없습니다.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/auth/login")}
          className="bg-black hover:bg-gray-800"
        >
          로그인하기
        </Button>
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="text-black"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default AuthError;

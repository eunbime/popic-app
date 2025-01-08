import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-[400px]">
      <h1 className="text-3xl font-bold">Welcome to popic</h1>
      <div className="flex flex-col gap-4 items-center">
        <div className="bg-blue-500 text-white p-2 rounded-md">
          <Link href="/auth/login">이메일로 로그인하기</Link>
        </div>
        <div className="bg-yellow-500 text-white p-2 rounded-md">
          <Link href="/register">카카오톡으로 로그인하기</Link>
        </div>
        <div className="bg-red-500 text-white p-2 rounded-md">
          <Link href="/register">Gmail로 로그인하기</Link>
        </div>
        <p className="text-sm text-gray-500 mt-5">
          아직 회원이 아니신가요? <Link href="/auth/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleSigninButton = () => {
  const handleGoogleSignin = async () => {
    try {
      const result = await signIn("google");
      if (result?.error) {
        console.error("Google Signin Error:", result.error);
      }
    } catch (error) {
      console.error("Google Signin Error:", error);
    }
  };

  return (
    <div
      onClick={handleGoogleSignin}
      className="flex items-center justify-center gap-3 bg-white text-black p-2 rounded-md shadow-md border border-gray-200 hover:bg-gray-200 transition-all duration-300 cursor-pointer"
    >
      <FcGoogle />
      <span>Gmail로 로그인하기</span>
    </div>
  );
};

export default GoogleSigninButton;

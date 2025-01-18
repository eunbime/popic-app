"use client";

import { signIn } from "next-auth/react";

const GoogleSigninButton = () => {
  const handleGoogleSignin = async () => {
    console.log("Google Signin Button Clicked");
    try {
      const result = await signIn("google");
      if (result?.error) {
        console.error("Google Signin Error:", result.error);
      }
    } catch (error) {
      console.error("Google Signin Error:", error);
    }
  };

  return <button onClick={handleGoogleSignin}>Gmail로 로그인하기</button>;
};

export default GoogleSigninButton;

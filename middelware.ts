import { NextRequest, NextResponse } from "next/server";
import authConfig from "./lib/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isPublicPath = req.nextUrl.pathname === "/" || isAuthPage;

  console.log({ session });

  if (!session?.user?.email && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 로그인한 사용자가 공개 페이지 접근 시
  if (session?.user && isPublicPath) {
    return NextResponse.redirect(new URL("/gallery", req.url));
  }

  return NextResponse.next();
});

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

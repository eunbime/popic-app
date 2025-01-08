import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 보호된 라우트를 위한 미들웨어
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuthPage = pathname.startsWith("/auth");
    const isPublicPath = pathname === "/" || isAuthPage;

    // 로그인한 사용자가 공개 페이지 접근 시
    if (req.nextauth.token && isPublicPath) {
      return NextResponse.redirect(new URL("/social/feed", req.url));
    }
  },
  {
    callbacks: {
      // false를 반환하면 /auth/login으로 리다이렉트됨
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        const isAuthPage = pathname.startsWith("/auth");
        const isPublicPath = pathname === "/" || isAuthPage;

        // 공개 페이지는 토큰 없이 접근 가능
        if (isPublicPath) {
          return true;
        }

        // 그 외 페이지는 토큰이 있어야 접근 가능
        return !!token;
      },
    },
  }
);

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    // 보호할 경로 지정
    "/social/:path*",
    // 공개 경로 지정
    "/",
    "/auth/:path*",
  ],
};

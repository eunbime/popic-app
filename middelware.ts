import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isWelcomePage = req.nextUrl.pathname === "/welcome";
    const isLoggedIn = !!req.nextauth.token;

    // 로그인한 사용자가 auth나 welcome 페이지 접근 시 settings로 리다이렉트
    if (isLoggedIn && (isAuthPage || isWelcomePage)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 로그인하지 않은 사용자가 auth나 welcome 페이지가 아닌 곳에 접근 시
    if (!isLoggedIn && !isAuthPage && !isWelcomePage) {
      return NextResponse.redirect(new URL("/welcome", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
        const isWelcomePage = req.nextUrl.pathname === "/welcome";

        // auth 페이지나 welcome 페이지는 토큰 없이 접근 가능
        if (isAuthPage || isWelcomePage) {
          return true;
        }
        return !!token;
      },
    },
  }
);
export const config = {
  matcher: [
    "/welcome",
    "/auth/login",
    "/auth/register",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

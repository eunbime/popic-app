import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // 보호된 경로 목록
  const protectedPaths = ["/gallery", "/settings", "/profile", "/api"];

  // 경로 체크
  const isLoggedIn = !!session?.user;
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isOnAuthPage = pathname.startsWith("/auth");
  const isPublicPath = pathname === "/" || isOnAuthPage;

  // 1. 로그인이 필요한 페이지 접근 시
  if (isProtectedPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. 이미 로그인된 상태에서 인증 페이지 접근 시
  if (isPublicPath && isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/gallery/${session.user.id}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/gallery/:path*",
    "/profile/:path*",
    "/auth/:path*",
    "/api/:path*",
    "/settings/:path*",
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isPublicPath = req.nextUrl.pathname === "/" || isAuthPage;

  // 인증된 사용자가 인증 페이지에 접근하려 할 때
  if (isAuthPage && isLoggedIn) {
    return Response.redirect(
      new URL(`/gallery/${req.auth?.user?.id}`, req.url)
    );
  }

  // 인증 안된 사용자가 인증이 필요한 페이지에 접근하려 할 때
  if (!isLoggedIn && !isPublicPath) {
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/auth/:path*",
    "/",
  ],
};

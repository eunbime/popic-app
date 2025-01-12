import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextRequest } from "next/server";
import { compare } from "bcryptjs";
import { db } from "./db";

export default {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("인증 정보가 필요합니다");
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user || !user.password) {
          throw new Error("사용자를 찾을 수 없습니다");
        }
        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("비밀번호가 일치하지 않습니다");
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    async authorized({
      auth,
      request,
    }: {
      auth: { user?: { id: string; email: string; image: string } } | null;
      request: NextRequest;
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/gallery");
      const isOnAuthPage = request.nextUrl.pathname.startsWith("/auth");
      const isPublicPath = request.nextUrl.pathname === "/" || isOnAuthPage;

      // 대시보드 접근 시 로그인 필요
      if (isOnDashboard && !isLoggedIn) {
        return false;
      }

      // 로그인된 상태에서 인증 페이지 접근 시 대시보드로 리다이렉트
      if (isPublicPath && isLoggedIn) {
        return Response.redirect(
          new URL(`/gallery/${auth?.user?.id}`, request.url)
        );
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

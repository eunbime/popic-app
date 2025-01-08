import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("인증 정보가 필요합니다");
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.password) {
          throw new Error("사용자를 찾을 수 없습니다");
        }
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("비밀번호가 일치하지 않습니다");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

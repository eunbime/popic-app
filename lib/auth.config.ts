import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { db } from "./db";

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
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
    async signIn({ user, account }) {
      if (!user?.email) {
        console.error("No email provided");
        return false;
      }

      if (account?.provider === "google") {
        try {
          const existingUser = await db.user.findUnique({
            where: { email: user.email! },
          });
          if (!existingUser) {
            const newUser = await db.user.create({
              data: {
                email: user.email!,
                name: user.name!,
                image: user.image,
              },
            });
            return !!newUser;
          }
          return true;
        } catch (error) {
          console.error("Error creating user", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          const dbUser = await db.user.findUnique({
            where: { email: token.email! },
          });
          if (dbUser) {
            token.id = dbUser.id;
          }
        }
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

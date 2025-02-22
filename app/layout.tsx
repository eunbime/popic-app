import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { auth } from "@/lib/auth";
import ThemeProvider from "@/components/providers/ThemeProvider";
import NavBar from "@/components/navigation/nav-bar";
import Header from "@/components/header";
import ModalProvider from "@/components/providers/modal-provider";
import { UserInitializer } from "@/components/providers/user-initializer";
import QueryProvider from "@/components/providers/query-provider";
import FloatingAddButton from "@/components/floating-add-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Popic",
  description: "Popic은 사진 일기 공유 애플리케이션입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#111827"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Popic" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <UserInitializer user={session?.user} />
          <QueryProvider>
            <ModalProvider />
            <div className="w-full h-full bg-white dark:bg-dark-gray text-black dark:text-white">
              {children}
            </div>
            <NavBar />
            <FloatingAddButton />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

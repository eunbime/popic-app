import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import NavBar from "@/components/navigation/nav-bar";
import Header from "@/components/header";
import { auth } from "@/lib/auth";
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
  description: "Popic is a photo sharing app",
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
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
            <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white">
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

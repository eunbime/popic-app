import BackButton from "@/components/back-button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-xl mx-auto h-full min-h-screen flex items-center justify-center">
      <BackButton />
      {children}
    </div>
  );
}

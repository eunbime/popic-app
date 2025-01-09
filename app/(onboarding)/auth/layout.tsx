import BackButton from "@/components/back-button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <BackButton />
      {children}
    </div>
  );
}

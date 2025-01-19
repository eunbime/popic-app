import SocialNavBar from "@/components/navigation/social-nav-bar";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SocialNavBar />
      <div className="w-full h-full bg-white dark:bg-gray-900 pb-[80px]">
        {children}
      </div>
    </div>
  );
}

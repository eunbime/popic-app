import SocialNavBar from "@/components/navigation/social-nav-bar";
import SocialSideBar from "@/components/navigation/social-side-bar";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SocialNavBar />
      <div className="flex w-full h-full bg-white dark:bg-gray-900 pb-[80px]">
        {children}
        <SocialSideBar />
      </div>
    </div>
  );
}

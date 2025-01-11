import FloatingAddButton from "@/components/floating-add-button";
import SocialNavBar from "@/components/navigation/soclal-nav-bar";

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
      <FloatingAddButton />
    </div>
  );
}

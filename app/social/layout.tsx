import SocialNavBar from "@/components/navigation/soclal-nav-bar";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SocialNavBar />
      {children}
    </div>
  );
}

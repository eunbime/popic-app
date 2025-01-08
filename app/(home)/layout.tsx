import TopNavBar from "@/components/navigation/top-nav-bar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNavBar />
      {children}
    </div>
  );
}

import TopNavBar from "@/components/navigation/top-nav-bar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNavBar />
      <div className="w-full h-full bg-white dark:bg-gray-900">{children}</div>
    </div>
  );
}

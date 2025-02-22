import TopNavBar from "@/components/navigation/top-nav-bar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNavBar />
      <div className="w-full h-full pb-[100px]">{children}</div>
    </div>
  );
}

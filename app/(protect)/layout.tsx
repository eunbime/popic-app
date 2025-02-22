import SideBar from "@/components/navigation/side-bar";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-6xl mx-auto pt-[50px] md:pt-0 w-full h-full min-h-screen">
      <SideBar />
      <div className="pl-0 md:pl-[250px] w-full h-full">{children}</div>
    </div>
  );
}

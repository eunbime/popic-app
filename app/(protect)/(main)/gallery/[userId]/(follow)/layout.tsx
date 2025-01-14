import FollowNav from "@/components/navigation/follow-nav";

export default function FollowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <FollowNav />
      {children}
    </div>
  );
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-[50px] w-full h-full bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}

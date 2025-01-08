export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900">{children}</div>
  );
}

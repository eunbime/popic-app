import Link from "next/link";

import { signOut } from "@/lib/auth";

export default function Settings() {
  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-start border-b divide-y dark:divide-gray-800 divide-gray-200 p-2 ">
      <Link className="w-full p-4" href="/settings/profile">
        Profile
      </Link>
      <span className="w-full p-4 cursor-pointer" onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
}

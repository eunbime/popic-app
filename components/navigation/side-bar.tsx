import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

const SideBar = async () => {
  const session = await auth();

  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  return (
    <aside className="!fixed !hidden md:!block w-[250px] h-screen bg-white dark:bg-dark-gray border-r border-gray-200 dark:border-gray-800 py-10 px-3 gap-5 mr-10">
      <nav className="flex flex-col w-full h-full justify-between">
        <ul className="flex flex-col gap-5 font-semibold text-lg">
          <li>
            <Link href={`/gallery/${session?.user?.id}`}>Gallery</Link>
          </li>
          <li>
            <Link href={`/calendar/${session?.user?.id}`}>Calendar</Link>
          </li>
          <li>
            <Link href="/social/feed?filter=all">Feed</Link>
          </li>
          <li>
            <Link href="/social/like?filter=all">Like</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-5 font-semibold text-lg">
          <li>
            <Link href="/settings">Setting</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;

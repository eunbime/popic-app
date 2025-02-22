import { auth, signOut } from "@/lib/auth";
import SideBarList from "@/components/navigation/side-bar-list";

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
          <SideBarList href={`/gallery/${session?.user?.id}`}>
            Gallery
          </SideBarList>
          <SideBarList href={`/calendar/${session?.user?.id}`}>
            Calendar
          </SideBarList>
          <SideBarList href="/social/feed?filter=all">Feed</SideBarList>
          <SideBarList href="/social/like?filter=all">Like</SideBarList>
        </ul>
        <ul className="flex flex-col gap-5 font-semibold text-lg">
          <SideBarList href="/settings">Setting</SideBarList>
          <li className="hover:text-main-blue transition-all duration-300">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;

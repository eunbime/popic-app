import Link from "next/link";

const TopNavBar = () => {
  return (
    <div className="w-full h-[30px] flex justify-center items-center border-b">
      <Link
        href={"/gallery"}
        className="flex flex-1 justify-center items-center border-r"
      >
        갤러리
      </Link>
      <Link
        href={"/calendar"}
        className="flex flex-1 justify-center items-center "
      >
        캘린더
      </Link>
    </div>
  );
};

export default TopNavBar;

import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  return (
    <div className="absolute top-2 left-2 text-black dark:text-white">
      <Link href="/">
        <BiArrowBack size={30} />
      </Link>
    </div>
  );
};

export default BackButton;

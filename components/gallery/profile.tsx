import { auth } from "@/lib/auth";
import Image from "next/image";

const Profile = async () => {
  const session = await auth();
  return (
    <div className="w-full h-[150px]">
      <div className="max-w-[350px] h-full mx-auto flex justify-between items-center">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={
              session?.user?.image ??
              "https://via.placeholder.com/100x100?text=profile"
            }
            alt="profile"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-[230px] h-[100px] bg-gray-200 rounded-lg px-4 py-3 gap-2">
          <span className="text-sm font-bold">{session?.user?.name}</span>
          <p className="text-sm text-gray-500 ">
            {session?.user?.bio ?? "바이오가 작성되지 않았습니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

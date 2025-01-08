import Image from "next/image";

const Profile = () => {
  return (
    <div className="w-full h-[150px]">
      <div className="max-w-[350px] h-full mx-auto flex justify-between items-center">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src="https://via.placeholder.com/100x100?text=profile"
            alt="profile"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-[230px] h-[100px] bg-gray-200 rounded-lg px-4 py-3 gap-2">
          <span className="text-sm font-bold">username</span>
          <p className="text-sm text-gray-500 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import Image from "next/image";

const PostBox = () => {
  return (
    <div className="w-full h-full flex gap-10">
      <div className="flex flex-col gap-2 items-center">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-gray-200">
          <Image
            src={"https://via.placeholder.com/80x80?text=profile"}
            alt="post"
            width={80}
            height={80}
          />
        </div>
        <p className="text-sm font-semibold text-gray-500">John Doe</p>
      </div>
      <div className="flex-1 w-full h-full flex flex-col">
        <div className="w-[250px] h-[250px] rounded-md overflow-hidden bg-gray-400">
          <Image
            src={"https://via.placeholder.com/250x250?text=image"}
            alt="post"
            width={250}
            height={250}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PostBox;

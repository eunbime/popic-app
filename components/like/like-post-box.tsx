import Image from "next/image";

const LikePostBox = () => {
  return (
    <div className="w-[120px] h-[120px] rounded-sm overflow-hidden bg-gray-400">
      <Image
        src={"https://via.placeholder.com/120x120?text=image"}
        alt="post"
        width={120}
        height={120}
        className="object-cover"
      />
    </div>
  );
};

export default LikePostBox;

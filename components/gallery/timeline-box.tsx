import Image from "next/image";

const TimelineBox = () => {
  return (
    <div className="w-[350px] h-[400px] bg-gray-200 mx-auto mt-5">
      <Image
        src="https://via.placeholder.com/350x350?text=photo"
        alt="gallery"
        width={350}
        height={350}
        className="object-cover"
      />
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    </div>
  );
};

export default TimelineBox;

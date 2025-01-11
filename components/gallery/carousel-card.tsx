import { format } from "date-fns";
import Image from "next/image";

interface CarouselCardProps {
  date: Date;
  count: number;
  onClick: () => void;
  thumbnailUrl: string | null;
}

const CarouselCard = ({
  date,
  onClick,
  count,
  thumbnailUrl,
}: CarouselCardProps) => {
  return (
    <div
      className="flex items-center justify-center h-full bg-gray-200 relative cursor-pointer"
      onClick={onClick}
    >
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt="thumbnail"
          width={100}
          height={100}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      )}
      <div className="flex justify-center w-full h-full gap-1 bg-gray-200">
        <span className="absolute bottom-[5px] left-[2px] text-[8px] text-white bg-black rounded-md opacity-20 px-1">
          {format(date, "yyyy.MM.dd")}
        </span>
        <span className="absolute flex items-center justify-center bottom-[3px] right-[2px] text-[8px] bg-black text-white w-4 h-4 text-center rounded-full opacity-70">
          {count}
        </span>
      </div>
    </div>
  );
};

export default CarouselCard;

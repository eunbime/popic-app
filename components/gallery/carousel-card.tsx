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
    <div className="flex items-center justify-center h-full bg-gray-200 relative">
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt="thumbnail"
          width={100}
          height={100}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      )}
      <div
        onClick={onClick}
        className="flex justify-center h-full gap-1 bg-gray-200 cursor-pointer hover:bg-gray-300 transition rounded-lg"
      >
        <span className="text-sm text-gray-500 opacity-45">
          {format(date, "yyyy.MM.dd")}
        </span>
        <span className="text-sm text-gray-500 opacity-45">({count})</span>
      </div>
    </div>
  );
};

export default CarouselCard;

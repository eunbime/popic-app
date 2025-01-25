import Image from "next/image";

interface CarouselCardProps {
  date: Date;
  count: number;
  onClick: () => void;
  thumbnailUrl: string | null;
  isSelected?: boolean;
}

const CarouselCard = ({ onClick, count, thumbnailUrl }: CarouselCardProps) => {
  return (
    <div
      className="relative h-full bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-full bg-gray-200 overflow-hidden">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt="thumbnail"
            fill
            className="w-full h-full object-cover"
            priority
          />
        )}
      </div>
      <div className="flex justify-center w-full h-full gap-1 bg-gray-200">
        <span className="absolute flex items-center justify-center top-[3px] right-[2px] text-[8px] bg-black text-white w-4 h-4 text-center rounded-full opacity-70">
          {count}
        </span>
      </div>
    </div>
  );
};

export default CarouselCard;

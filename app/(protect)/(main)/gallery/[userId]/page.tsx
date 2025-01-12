import CarouselBox from "@/components/gallery/carousel-box";
import Profile from "@/components/gallery/profile";
import Timeline from "@/components/gallery/timeline";

type PageParams = Promise<{ userId: string }>;

export default async function GalleryPage({ params }: { params: PageParams }) {
  const { userId } = await params;

  return (
    <div className="flex flex-col w-full h-full">
      <Profile userId={userId} />
      <div className="w-full h-full">
        <CarouselBox userId={userId} />
        <Timeline userId={userId} />
      </div>
    </div>
  );
}

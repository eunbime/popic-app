import Carousel from "@/components/gallery/carousel";
import Profile from "@/components/gallery/profile";
import Timeline from "@/components/gallery/timeline";

export default function GalleryPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <Profile />
      <div className="w-full h-full">
        <Carousel />
        <Timeline />
      </div>
    </div>
  );
}

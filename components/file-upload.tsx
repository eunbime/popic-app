"use client";

import "@uploadthing/react/styles.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { UploadButton } from "@/utils/uploadthing";

interface FileUploadProps {
  onChange: (url: string | null) => void;
  value: string | null;
  endpoint: "galleryImage" | "profileImage";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(value || null);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  if (value) {
    return (
      <div>
        <Image
          src={imageUrl || "/images/default-profile.png"}
          alt="Upload"
          fill
          className="object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setImageUrl(null);
            onChange(null);
          }}
          className="absolute top-2 right-2 bg-black text-white rounded-full shadow-sm "
        >
          <X className="w-7 h-7" />
        </button>
      </div>
    );
  }

  return (
    <UploadButton
      className="w-full h-full"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        setImageUrl(res[0].url);
        onChange(res[0].url);
      }}
      onUploadError={(error) => {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }}
    />
  );
};

export default FileUpload;

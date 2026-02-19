"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LikeButton from "@/components/LikeButton";


interface ImageItem {
  _id: string;
  imageUrl: string;
  speciesName: string;
  likeCount: number;
  likedByMe: boolean;
  uploadedBy: {
    username: string;
  };
}

export default function GalleryGrid() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImages(data);
      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-20 text-[#263238] text-lg font-medium">
        Loading gallery...
      </p>
    );
  }

  return (
    <section className="bg-[#F5F5DC] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">

          {images.map((img) => (
            <div
              key={img._id}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white"
            >
              {/* Image */}
              <div className="relative w-full">
                <Image
                  src={img.imageUrl}
                  alt={img.speciesName}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Info Section */}
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-[#1B4332]">
                  {img.speciesName}
                </h3>

                <p className="text-sm text-gray-600">
                  Photographer:{" "}
                  <span className="font-medium text-[#344E41]">
                    {img.uploadedBy?.username ?? "Unknown"}
                  </span>
                </p>

                <LikeButton
  imageId={img._id}
  initialLiked={img.likedByMe}
  initialCount={img.likeCount}
/>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

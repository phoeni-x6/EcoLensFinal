"use client";

import { useEffect, useState } from "react";
import GalleryFlipCard from "./GalleryFlipCard";

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
      <p className="text-center py-20 text-[#263238]">
        Loading gallery...
      </p>
    );
  }

  return (
    <section className="bg-[#F5F5DC] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {images.map((img) => (
          <GalleryFlipCard
            key={img._id}
            imageId={img._id}
            image={img.imageUrl}
            animal={img.speciesName}
            photographer={img.uploadedBy?.username ?? "Unknown"}
            likeCount={img.likeCount}
            likedByMe={img.likedByMe}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { FC, useState } from "react";
import Image from "next/image";

interface Props {
  image: string;
  animal: string;
  photographer: string;
}

const GalleryFlipCard: FC<Props> = ({ image, animal, photographer }) => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="flex flex-col items-center animate-slideUp">
      {/* Flip Card */}
      <div className="w-full h-72 perspective">
        <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 hover:rotate-y-180">

          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg">
            <Image src={image} alt={animal} fill className="object-cover" />
          </div>

          {/* Back */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-lg bg-[#2E7D32] text-[#F5F5DC] flex flex-col items-center justify-center px-4">
            <h3 className="text-xl font-semibold">{animal}</h3>
            <p className="mt-2 text-sm">By {photographer}</p>
          </div>
        </div>
      </div>

      {/* Like Button */}
      <button
        onClick={() => setLikes(likes + 1)}
        className="mt-3 flex items-center gap-2 text-[#263238] hover:text-[#C62828] transition"
      >
        ❤️ <span className="font-medium">{likes}</span>
      </button>
    </div>
  );
};

export default GalleryFlipCard;

"use client";

import { FC, useState } from "react";
import Image from "next/image";

interface FlipCardProps {
  image: string;
  photographer: string;
  animal: string;
}

const FlipCard: FC<FlipCardProps> = ({ image, photographer, animal }) => {
  const [likes, setLikes] = useState<number>(0);

  return (
    <div className="flex flex-col items-center">
      {/* Flip Card */}
      <div className="w-full h-72 perspective">
        <div className="relative w-full h-full duration-700 transform-style-preserve-3d hover:rotate-y-180">

          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={animal}
              fill
              className="object-cover"
            />
          </div>

          {/* Back */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden bg-[#2E7D32] text-[#F5F5DC] rounded-lg shadow-lg flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-xl font-semibold">{animal}</h3>
            <p className="mt-2 text-sm">By {photographer}</p>
          </div>

        </div>
      </div>

      {/* Like Section */}
      <button
        onClick={() => setLikes((prev) => prev + 1)}
        className="mt-3 flex items-center gap-2 text-[#263238] hover:text-[#C62828] transition-colors"
      >
        ❤️ <span className="font-medium">{likes}</span>
      </button>
    </div>
  );
};

export default FlipCard;
 
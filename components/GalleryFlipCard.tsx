"use client";

import { FC, useState } from "react";
import Image from "next/image";

interface Props {
  imageId: string;
  image: string;
  animal: string;
  photographer: string;
  likeCount: number;
  likedByMe: boolean;
}

const GalleryFlipCard: FC<Props> = ({
  imageId,
  image,
  animal,
  photographer,
  likeCount,
  likedByMe,
}) => {
  const [likes, setLikes] = useState(likeCount);
  const [liked, setLiked] = useState(likedByMe);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);

    // Optimistic UI
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await fetch("/api/likes", {
        method: liked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId }),
      });
    } catch (err) {
      // rollback on error
      setLiked(liked);
      setLikes(likeCount);
    } finally {
      setLoading(false);
    }
  };

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
        onClick={toggleLike}
        disabled={loading}
        className={`mt-3 flex items-center gap-2 transition
          ${liked ? "text-[#C62828]" : "text-[#263238] hover:text-[#C62828]"}
        `}
      >
        ❤️ <span className="font-medium">{likes}</span>
      </button>
    </div>
  );
};

export default GalleryFlipCard;

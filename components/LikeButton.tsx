"use client";

import { useState } from "react";

interface LikeButtonProps {
  imageId: string;
  initialLiked: boolean;
  initialCount: number;
}

export default function LikeButton({
  imageId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    const res = await fetch(`/api/likes/${imageId}`, {
      method: "POST",
    });

    const data = await res.json();

    setLiked(data.liked);
    setCount(data.likeCount);
  };

  return (
    <button onClick={handleLike}>
      {liked ? "❤️" : "🤍"} {count}
    </button>
  );
}

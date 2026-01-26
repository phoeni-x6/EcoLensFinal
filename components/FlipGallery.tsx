"use client";

import { FC } from "react";
import FlipCard from "./FlipCard";

const galleryData = [
  {
    image: "/images/1.jpg", // ✅ FIXED
    photographer: "Dihan Hewage",
    animal: "Wild Elephant",
  },
  {
    image: "/images/1.jpg",
    photographer: "Dihan Hewage",
    animal: "Leopard",
  },
  {
    image: "/images/1.jpg",
    photographer: "Dihan Hewage",
    animal: "Peacock",
  },
  {
    image: "/images/1.jpg",
    photographer: "Dihan Hewage",
    animal: "Eagle",
  },
  {
    image: "/images/1.jpg",
    photographer: "Dihan Hewage",
    animal: "Spotted Deer",
  },
  {
    image: "/images/1.jpg",
    photographer: "Dihan Hewage",
    animal: "Toque Macaque",
  },
];

const FlipGallery: FC = () => {
  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2E7D32] text-center mb-10">
          Wildlife Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleryData.map((item, index) => (
            <FlipCard
              key={index}
              image={item.image}
              photographer={item.photographer}
              animal={item.animal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlipGallery;

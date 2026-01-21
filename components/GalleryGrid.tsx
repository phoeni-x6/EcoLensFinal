"use client";

import GalleryFlipCard from "./GalleryFlipCard";

const data = [
  {
    image: "/images/elephant.jpg",
    animal: "Wild Elephant",
    photographer: "Dihan Hewage",
  },
  {
    image: "/images/leopard.jpg",
    animal: "Sri Lankan Leopard",
    photographer: "Dihan Hewage",
  },
  {
    image: "/images/peacock.jpg",
    animal: "Peacock",
    photographer: "Dihan Hewage",
  },
  {
    image: "/images/deer.jpg",
    animal: "Spotted Deer",
    photographer: "Dihan Hewage",
  },
  {
    image: "/images/eagle.jpg",
    animal: "Eagle",
    photographer: "Dihan Hewage",
  },
  {
    image: "/images/monkey.jpg",
    animal: "Toque Macaque",
    photographer: "Dihan Hewage",
  },
];

const GalleryGrid = () => {
  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <GalleryFlipCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;

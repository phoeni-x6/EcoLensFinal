import { FC } from "react";

const GalleryHero: FC = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/gallery-hero.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-[#F5F5DC]">
          Wildlife Photography of Sri Lanka
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-[#F5F5DC]/90">
          Discover rare moments from Sri Lanka’s rich wildlife captured through
          the lens of passionate photographers.
        </p>
      </div>

    </section>
  );
};

export default GalleryHero;

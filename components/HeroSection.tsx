// components/HeroSection.tsx
import Link from "next/link";
import { FC } from "react";

const HeroSection: FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/home-hero.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F5DC] drop-shadow-lg">
          Discover the Wonders of Wildlife
        </h1>

        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-[#F5F5DC] drop-shadow-md max-w-2xl">
          Explore, Learn, and Protect Our Planet’s Amazing Wildlife
        </p>

        <Link
          href="/explore"
          className="mt-8 px-6 py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded-lg hover:bg-[#66BB6A] transition-colors duration-300 no-underline"
        >
          Explore Wildlife
        </Link>
      </div>

    </section>
  );
};

export default HeroSection;

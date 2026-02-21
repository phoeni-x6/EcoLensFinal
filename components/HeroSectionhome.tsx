// components/HeroSection.tsx
"use client";
import Link from "next/link";
import { FC } from "react";

const HeroSectionhome: FC = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/wildlife-hero.jfif')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />


    </section>
  );
};

export default HeroSectionhome;

import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import PhotographerOfMonth from "@/components/PhotographerOfMonth";
import FlipGallery from "@/components/FlipGallery";


const HomePage: React.FC = () => {
  return (
    <div>
     
      <HeroSection />
      <AboutUs />
      <PhotographerOfMonth />
      <FlipGallery />
    </div>
  );
};

export default HomePage;

"use client";

import { FC, useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  imageUrl: string;
  height?: string;
  speed?: number; // lower = slower movement
  children?: React.ReactNode;
}

const ParallaxImage: FC<ParallaxImageProps> = ({
  imageUrl,
  height = "h-[600px]",
  speed = 0.5,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollPosition = window.scrollY;
      const elementTop = ref.current.offsetTop;
      const distance = scrollPosition - elementTop;
      setOffset(distance * speed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden ${height}`}
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${offset}px)`,
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-6">
        {children}
      </div>
    </section>
  );
};

export default ParallaxImage;
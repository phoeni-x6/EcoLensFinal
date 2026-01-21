import { FC } from "react";
import Image from "next/image";

const AboutUs: FC = () => {
  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E7D32]">
              About EcoLens
            </h2>

            <p className="mt-4 text-[#616161] text-lg leading-relaxed">
              EcoLens is a wildlife-focused platform dedicated to exploring,
              documenting, and protecting nature. We combine technology and
              environmental awareness to help people discover wildlife and
              understand the importance of conservation.
            </p>

            <p className="mt-3 text-[#616161] text-lg leading-relaxed">
              Our mission is to inspire responsible interaction with nature
              through visual storytelling and data-driven insights.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/logo.jpeg" // replace with your image path
              alt="Wildlife conservation"
              width={480}
              height={320}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;

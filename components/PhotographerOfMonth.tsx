import { FC } from "react";
import Image from "next/image";

const PhotographerOfMonth: FC = () => {
  return (
    <section className="bg-[#FFFFFF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Photographer Image (Left) */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/photographer.jpg" // replace with photographer image
              alt="Photographer of the Month"
              width={420}
              height={520}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Photographer Details (Right) */}
          <div>
            <span className="text-sm font-semibold tracking-wide text-[#66BB6A] uppercase">
              Photographer of the Month
            </span>

            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#2E7D32]">
              Dihan Hewage
            </h2>

            <p className="mt-4 text-[#616161] text-lg leading-relaxed">
              Dihan is a wildlife photographer passionate about capturing rare
              moments in nature. His work focuses on Sri Lankan wildlife,
              highlighting the beauty and fragility of natural ecosystems.
            </p>

            <p className="mt-3 text-[#616161] text-lg leading-relaxed">
              Through EcoLens, his photographs aim to raise awareness about
              conservation and inspire people to protect wildlife habitats.
            </p>

            {/* Optional Meta Info */}
            <div className="mt-6 flex gap-6 text-sm text-[#616161]">
              <span>
                <strong className="text-[#263238]">Specialty:</strong> Wildlife
              </span>
              <span>
                <strong className="text-[#263238]">Location:</strong> Sri Lanka
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PhotographerOfMonth;

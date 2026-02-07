import { FC } from "react";
import Image from "next/image";

const AboutUs: FC = () => {
  return (
    <section className="bg-softbeige py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT — TEXT */}
          <div>
            <span className="uppercase tracking-widest text-sm text-leaf">
              About Us
            </span>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              Connecting People <br />
              <span className="text-forest">With Wildlife</span>
            </h2>

            <p className="mt-6 text-textgrey text-lg leading-relaxed max-w-xl">
              EcoLens is a wildlife-focused platform dedicated to exploring,
              documenting, and protecting nature through technology and
              environmental awareness.
            </p>

            <p className="mt-4 text-textgrey text-lg leading-relaxed max-w-xl">
              We believe responsible visual storytelling can inspire people to
              understand ecosystems better and take meaningful action toward
              conservation.
            </p>

            {/* Values Strip */}
            <div className="mt-8 border-l-4 border-forest pl-5 space-y-2 text-sm text-textgrey">
              <p>• Ethical wildlife documentation</p>
              <p>• Conservation-first design</p>
              <p>• Technology serving nature</p>
            </div>
          </div>

          {/* RIGHT — VISUAL */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-[420px] h-[320px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/logo.jpeg" // replace with wildlife image if needed
                alt="Wildlife conservation"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative Accent */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-leaf/20 hidden md:block" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutUs;

import Image from "next/image";

const AboutContent = () => {
  return (
    <section className="bg-[#F5F5DC] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text + Logo */}
          <div>
            {/* Logo Space */}
            <div className="mb-6">
              <Image
                src="/images/logo.jpeg"
                alt="EcoLens Logo"
                width={80}
                height={80}
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#2E7D32]">
              Our Story
            </h2>

            <p className="mt-4 text-[#616161] text-lg leading-relaxed">
              EcoLens was created to celebrate and protect wildlife through
              powerful visual storytelling. We believe photography can inspire
              awareness, responsibility, and action toward conservation.
            </p>

            <p className="mt-4 text-[#616161] text-lg leading-relaxed">
              Focused on Sri Lanka’s rich biodiversity, EcoLens connects
              photographers, nature enthusiasts, and conservationists in one
              shared platform.
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full h-[350px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/1.jpg"
              alt="Wildlife in Sri Lanka"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutContent;

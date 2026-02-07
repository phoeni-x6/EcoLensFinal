import Image from "next/image";

const AboutContent = () => {
  return (
    <section className="bg-softbeige py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/images/logo.jpeg"
              alt="EcoLens Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
            <span className="uppercase tracking-widest text-sm text-leaf">
              About EcoLens
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            Seeing Nature Clearly. <br />
            <span className="text-forest">Protecting It Thoughtfully.</span>
          </h2>

          <p className="mt-6 text-textgrey text-lg leading-relaxed">
            EcoLens is a wildlife-focused digital platform built to explore,
            document, and protect nature through the combined power of
            photography, technology, and conservation awareness.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left – Story */}
          <div>
            <h3 className="text-2xl font-semibold text-forest mb-4">
              Our Story
            </h3>

            <p className="text-textgrey leading-relaxed mb-4">
              EcoLens was created with a simple belief: every image tells more
              than a story of beauty — it tells the story of ecosystems,
              species, and the delicate balance that sustains life on Earth.
            </p>

            <p className="text-textgrey leading-relaxed mb-6">
              Rooted in Sri Lanka’s extraordinary biodiversity, EcoLens brings
              together photographers, nature enthusiasts, and conservation-
              minded individuals into a shared digital space dedicated to
              ethical wildlife exploration.
            </p>

            {/* Values */}
            <div className="border-l-4 border-forest pl-4 space-y-3 text-sm text-textgrey">
              <p>• Ethical wildlife documentation</p>
              <p>• Conservation-first data handling</p>
              <p>• Technology used responsibly</p>
              <p>• Community-driven awareness</p>
            </div>
          </div>

          {/* Right – Image */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/1.jpg"
              alt="Sri Lankan wildlife"
              fill
              className="object-cover"
            />

            {/* Overlay caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-charcoal/70 backdrop-blur-sm p-4">
              <p className="text-offwhite text-sm">
                Capturing biodiversity while respecting nature’s boundaries
              </p>
            </div>
          </div>

        </div>

        {/* Mission Strip */}
        <div className="mt-28 rounded-3xl bg-offwhite p-12 shadow-lg border border-black/5">
          <h3 className="text-3xl font-bold text-charcoal mb-6">
            Our Mission
          </h3>

          <p className="text-textgrey text-lg leading-relaxed max-w-4xl">
            Our mission is to bridge the gap between wildlife observation and
            conservation action. By enabling responsible image sharing,
            EcoLens helps document biodiversity, raise awareness about
            endangered species, and protect sensitive wildlife locations
            without exposing them to harm.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutContent;

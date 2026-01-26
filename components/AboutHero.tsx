const AboutHero = () => {
  return (
    <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/1.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5DC]">
          About EcoLens
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[#F5F5DC]/90">
          Connecting people with wildlife through photography, technology,
          and conservation awareness.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;

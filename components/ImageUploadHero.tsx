const ImageUploadHero = () => {
  return (
    <section className="relative h-[55vh] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/1.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5DC]">
          Upload Wildlife Images
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-[#F5F5DC]/90">
          Share your wildlife photography and contribute to conservation
          awareness across Sri Lanka.
        </p>
      </div>
    </section>
  );
};

export default ImageUploadHero;

import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import PhotographerOfMonth from "@/components/PhotographerOfMonth";
import CircularGallery from "@/components/CircularGallery";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

const HomePage = async () => {
  await connectDB();

  // Fetch gallery images for circular gallery
  const galleryImages = await Image.find({
    isGalleryImage: true,
  })
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

  const formattedImages = galleryImages.map((img: any) => {
    const fullText = `${img.speciesName} • ${img.speciesType}`;
    const maxLength = 28;

    return {
      image: img.imageUrl,
      text:
        fullText.length > maxLength
          ? fullText.slice(0, maxLength) + "…"
          : fullText,
    };
  });

  // 📊 Stats (database optimized)
  const totalPhotos = await Image.countDocuments({
    isGalleryImage: true,
  });

  const uniquePhotographers = (
    await Image.distinct("uploadedBy", {
      isGalleryImage: true,
      uploadedBy: { $ne: null },
    })
  ).length;

  const uniqueSpecies = (
    await Image.distinct("speciesName", {
      isGalleryImage: true,
    })
  ).length;

  return (
    <div>
      <HeroSection />
      <AboutUs />
      <PhotographerOfMonth />

      {/* Circular Gallery Section */}
      <section className="bg-[#0f1a12] py-20 text-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#E8F5E9]">
            Explore Wildlife Moments
          </h2>
          <p className="mt-3 text-[#A5D6A7]">
            Experience nature through immersive photography.
          </p>
        </div>

        <div className="h-[75vh] relative">
          <CircularGallery
            items={formattedImages}
            bend={2}
            textColor="#E8F5E9"
            borderRadius={0.08}
            scrollSpeed={1.5}
            scrollEase={0.05}
          />
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="px-8 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] transition rounded-full"
          >
            View Full Gallery
          </Link>
        </div>
      </section>
{/* CONSERVATION BRIDGE SECTION */}
<section className="relative py-28 overflow-hidden text-white">

  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f14] via-[#163b2a] to-[#0e261a]"></div>

  {/* Soft Glow Accents */}
  <div className="absolute w-96 h-96 bg-[#2E7D32]/20 rounded-full blur-3xl -top-20 -left-20"></div>
  <div className="absolute w-96 h-96 bg-[#A5D6A7]/10 rounded-full blur-3xl -bottom-20 -right-20"></div>

  <div className="relative max-w-4xl mx-auto px-6 text-center">

    <div className="w-20 h-[2px] bg-[#2E7D32] mx-auto mb-8"></div>

    <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#E8F5E9] mb-8">
      More Than Photography —
      <br />
      A Living Record of Biodiversity
    </h2>

    <p className="text-lg md:text-xl text-[#C8E6C9] leading-relaxed">
      Every image shared on EcoLens captures a fleeting moment in nature.
      Together, these moments form a growing archive of the world’s
      wildlife — raising awareness, inspiring conservation, and connecting
      people with the ecosystems that sustain us.
    </p>

    <div className="w-20 h-[2px] bg-[#2E7D32] mx-auto mt-10"></div>

  </div>
</section>



      {/* Stats Section */}
      <section className="relative bg-gradient-to-b from-[#10271a] to-[#0b1f14] py-24 text-white">
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E8F5E9] mb-16">
            Our Growing Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <span className="text-6xl font-extrabold text-[#A5D6A7]">
                {totalPhotos}
              </span>
              <p className="mt-4 uppercase tracking-widest text-sm text-[#E8F5E9]">
                Wildlife Photos
              </p>
            </div>

            <div>
              <span className="text-6xl font-extrabold text-[#A5D6A7]">
                {uniquePhotographers}
              </span>
              <p className="mt-4 uppercase tracking-widest text-sm text-[#E8F5E9]">
                Photographers
              </p>
            </div>

            <div>
              <span className="text-6xl font-extrabold text-[#A5D6A7]">
                {uniqueSpecies}
              </span>
              <p className="mt-4 uppercase tracking-widest text-sm text-[#E8F5E9]">
                Species Documented
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

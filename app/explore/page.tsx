import WildlifeMap from "@/components/WildlifeMap";
import SpeciesList from "@/components/SpeciesList";

export default function ExplorePage() {
  return (
    <section className="bg-[#F5F5DC] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#2E7D32] text-center mb-6">
          Explore Wildlife in Sri Lanka
        </h1>

        <p className="text-center text-[#616161] max-w-2xl mx-auto mb-10">
          Discover wildlife locations and learn about endangered species
          across Sri Lanka.
        </p>

        {/* Map */}
        <WildlifeMap />

        {/* Species Dashboard */}
        <SpeciesList />

      </div>
    </section>
  );
}

import Image from "next/image";

const speciesData = [
  {
    id: 1,
    name: "Sri Lankan Leopard",
    image: "/images/endangered/1.jpg",
    status: "Endangered",
    scientific: "Panthera pardus kotiya",
    habitat: "Dry zone forests",
  },
  {
    id: 2,
    name: "Sri Lankan Elephant",
    image: "/images/endangered/2.jpg",
    status: "Endangered",
    scientific: "Elephas maximus maximus",
    habitat: "Grasslands and forests",
  },
  {
    id: 3,
    name: "Purple-faced Langur",
    image: "/images/endangered/3.jpg",
    status: "Critically Endangered",
    scientific: "Semnopithecus vetulus",
    habitat: "Tropical rainforests",
  },
  {
    id: 4,
    name: "Sri Lankan Pangolin",
    image: "/images/endangered/4.jpg",
    status: "Endangered",
    scientific: "Manis crassicaudata",
    habitat: "Forests & grasslands",
  },
  {
    id: 5,
    name: "Red Slender Loris",
    image: "/images/endangered/5.jpg",
    status: "Endangered",
    scientific: "Loris tardigradus",
    habitat: "Wet zone forests",
  },
  {
    id: 6,
    name: "Sri Lankan Junglefowl",
    image: "/images/endangered/6.jfif",
    status: "Vulnerable",
    scientific: "Gallus lafayettii",
    habitat: "Scrublands",
  },
  {
    id: 7,
    name: "Green Sea Turtle",
    image: "/images/endangered/7.jpg",
    status: "Endangered",
    scientific: "Chelonia mydas",
    habitat: "Coastal waters",
  },
  {
    id: 8,
    name: "Hawksbill Turtle",
    image: "/images/endangered/8.jfif",
    status: "Critically Endangered",
    scientific: "Eretmochelys imbricata",
    habitat: "Coral reefs",
  },
  {
    id: 9,
    name: "Sri Lankan Sloth Bear",
    image: "/images/endangered/9.jpg",
    status: "Vulnerable",
    scientific: "Melursus ursinus inornatus",
    habitat: "Dry forests",
  },
  {
    id: 10,
    name: "Sri Lankan Star Tortoise",
    image: "/images/endangered/10.jfif",
    status: "Vulnerable",
    scientific: "Geochelone elegans",
    habitat: "Arid regions",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Critically Endangered":
      return "bg-red-700";
    case "Endangered":
      return "bg-orange-600";
    case "Vulnerable":
      return "bg-yellow-600";
    default:
      return "bg-gray-500";
  }
};

export default function SpeciesList() {
  return (
    <section className="bg-[#F4F1EA] py-28 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="uppercase tracking-widest text-sm text-[#4A7C59]">
            Biodiversity Archive
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#1E2D24] leading-tight">
            Endangered Species <br />
            <span className="text-[#4A7C59]">Across Sri Lanka</span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Sensitive ecological data is responsibly presented to support
            conservation while minimizing environmental risk.
          </p>
        </div>

        {/* Creative Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {speciesData.map((species) => (
            <div
              key={species.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-black/5"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={species.image}
                  alt={species.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Status Badge */}
                <div
                  className={`absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full ${statusColor(
                    species.status
                  )}`}
                >
                  {species.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-[#1E2D24]">
                  {species.name}
                </h3>

                <p className="text-sm italic text-gray-500">
                  {species.scientific}
                </p>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Habitat:</span>{" "}
                  {species.habitat}
                </div>

                <div className="pt-3 border-t text-xs text-gray-500">
                  Location data restricted for species protection.
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

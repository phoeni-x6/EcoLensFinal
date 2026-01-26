import Image from "next/image";

const speciesData = [
  {
    id: 1,
    name: "Sri Lankan Leopard",
    image: "/images/1.jpg",
    details: [
      "Scientific Name: Panthera pardus kotiya",
      "Status: Endangered",
      "Habitat: Dry zone forests",
      "Location: Yala, Wilpattu",
    ],
  },
  {
    id: 2,
    name: "Sri Lankan Elephant",
    image: "/images/1.jpg",
    details: [
      "Scientific Name: Elephas maximus maximus",
      "Status: Endangered",
      "Habitat: Grasslands, forests",
      "Location: Udawalawe, Minneriya",
    ],
  },
  {
    id: 3,
    name: "Purple-faced Langur",
    image: "/images/1.jpg",
    details: [
      "Scientific Name: Semnopithecus vetulus",
      "Status: Critically Endangered",
      "Habitat: Rainforests",
      "Location: Wet zone Sri Lanka",
    ],
  },
];

export default function SpeciesList() {
  return (
    <section className="bg-[#E0E0E0] py-14 rounded-lg shadow-md mt-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#263238] mb-12">
          Extinct / Endangered Animal Dashboard
        </h2>

        {/* Rows */}
        <div className="space-y-10">
          {speciesData.map((species) => (
            <div
              key={species.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Image */}
              <div className="w-full h-80 bg-[#2E7D32] rounded-md overflow-hidden">
                <Image
                  src={species.image}
                  alt={species.name}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div>
                <h3 className="text-xl font-semibold text-[#263238] mb-4">
                  {species.name}
                </h3>

                <ul className="space-y-2">
                  {species.details.map((detail, index) => (
                    <li
                      key={index}
                      className="bg-white px-4 py-2 rounded text-sm text-[#616161]"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

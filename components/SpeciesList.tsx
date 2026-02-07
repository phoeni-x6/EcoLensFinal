import Image from "next/image";

const speciesData = [
  {
    id: 1,
    name: "Sri Lankan Leopard",
    image: "/images/1.jpg",
    status: "Endangered",
    details: [
      "Scientific Name: Panthera pardus kotiya",
      "Habitat: Dry zone forests",
    ],
  },
  {
    id: 2,
    name: "Sri Lankan Elephant",
    image: "/images/1.jpg",
    status: "Endangered",
    details: [
      "Scientific Name: Elephas maximus maximus",
      "Habitat: Grasslands and forests",
    ],
  },
  {
    id: 3,
    name: "Purple-faced Langur",
    image: "/images/1.jpg",
    status: "Critically Endangered",
    details: [
      "Scientific Name: Semnopithecus vetulus",
      "Habitat: Tropical rainforests",
    ],
  },
];

export default function SpeciesList() {
  return (
    <section className="bg-softbeige py-24 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
<div className="text-center max-w-3xl mx-auto mb-20">
  <span className="uppercase tracking-widest text-sm text-leaf">
    Conservation Dashboard
  </span>

  <h2 className="mt-3 text-4xl md:text-5xl font-bold text-charcoal leading-tight">
    Species at Risk <br />
    <span className="text-forest">Under Our Protection</span>
  </h2>

  <p className="mt-4 text-textgrey text-lg">
    Sensitive wildlife data is displayed responsibly to support conservation
    while preventing exploitation.
  </p>
</div>

        {/* Cards */}
        <div className="space-y-16">
          {speciesData.map((species) => (
            <div
              key={species.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={species.image}
                  alt={species.name}
                  fill
                  className="object-cover"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-deepred text-offwhite text-xs font-semibold px-4 py-1 rounded-full">
                  {species.status}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-semibold text-forest mb-4">
                  {species.name}
                </h3>

                <ul className="space-y-3">
                  {species.details.map((detail, index) => (
                    <li
                      key={index}
                      className="bg-offwhite px-5 py-3 rounded-xl text-sm text-textgrey shadow-sm border border-black/5"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Ethics Note */}
                <div className="mt-6 border-l-4 border-forest pl-4 text-sm text-textgrey">
                  Exact location data is restricted to protect this species from
                  potential threats.
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

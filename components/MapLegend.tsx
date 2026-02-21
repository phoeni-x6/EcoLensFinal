export default function MapLegend() {
  const legendItems = [
    {
      label: "Critically Endangered",
      color: "#D32F2F",
      description: "Immediate conservation action required",
    },
    {
      label: "Endangered",
      color: "#F57C00",
      description: "High risk of extinction in the wild",
    },
    {
      label: "Vulnerable",
      color: "#FBC02D",
      description: "Facing significant population decline",
    },
  ];

  return (
    <div className="backdrop-blur-md bg-white/80 border border-gray-200 rounded-2xl shadow-xl px-6 py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🌿</span>
        <h3 className="font-semibold text-gray-800 text-lg">
          Conservation Status
        </h3>
      </div>

      <div className="space-y-5">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            {/* Pin Style Indicator */}
            <div className="relative mt-1">
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: item.color }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                style={{ backgroundColor: item.color }}
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {item.label}
              </p>
              <p className="text-xs text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
        Data visible only to authorized wildlife officers.
      </div>
    </div>
  );
}
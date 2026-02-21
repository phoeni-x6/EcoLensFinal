"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import MapLegend from "@/components/MapLegend";

// Dynamically load the CLIENT map wrapper
const OfficerMapClient = dynamic(
  () => import("@/components/OfficerMapClient"),
  { ssr: false }
);

interface Animal {
  id: string;
  name: string;
  status: "Critically Endangered" | "Endangered" | "Vulnerable";
  lat: number;
  lng: number;
  location: string;
}

const animals: Animal[] = [
  { id: "1", name: "Sri Lankan Leopard", status: "Endangered", lat: 6.3725, lng: 81.5185, location: "Yala" },
  { id: "2", name: "Sri Lankan Elephant", status: "Endangered", lat: 6.4746, lng: 80.8987, location: "Udawalawe" },
  { id: "3", name: "Purple-faced Langur", status: "Critically Endangered", lat: 6.4032, lng: 80.4026, location: "Sinharaja" },
  { id: "4", name: "Sri Lankan Pangolin", status: "Endangered", lat: 7.4445, lng: 80.7952, location: "Knuckles" },
  { id: "5", name: "Red Slender Loris", status: "Endangered", lat: 6.9271, lng: 79.8612, location: "Western Forest Zone" },
  { id: "6", name: "Sri Lankan Junglefowl", status: "Vulnerable", lat: 7.2906, lng: 80.6337, location: "Kandy Region" },
  { id: "7", name: "Green Sea Turtle", status: "Endangered", lat: 5.9483, lng: 80.4716, location: "Mirissa Coast" },
  { id: "8", name: "Hawksbill Turtle", status: "Critically Endangered", lat: 6.0535, lng: 80.2210, location: "Galle Coast" },
  { id: "9", name: "Sri Lankan Sloth Bear", status: "Vulnerable", lat: 8.4498, lng: 80.0371, location: "Wilpattu" },
  { id: "10", name: "Sri Lankan Star Tortoise", status: "Vulnerable", lat: 8.3114, lng: 80.4037, location: "Anuradhapura" },
];

const statusColors: Record<string, string> = {
  "Critically Endangered": "#D32F2F",
  "Endangered": "#F57C00",
  "Vulnerable": "#FBC02D",
};

export default function EndangeredAnimalsMap() {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return null;

  const createIcon = (color: string) =>
    L.divIcon({
      className: "",
      html: `
        <div style="
          background:${color};
          width:20px;
          height:20px;
          border-radius:50% 50% 50% 0;
          transform: rotate(-45deg);
          border:2px solid white;
          box-shadow:0 0 5px rgba(0,0,0,0.5);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 20],
    });

  return (
    <div className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-red-700 text-center mb-10">
        Endangered Animals Map
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 items-start">

        <div className="w-full lg:w-[320px]">
          <MapLegend />
        </div>

        <div className="w-full lg:flex-1 h-[420px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <OfficerMapClient
            animals={animals}
            statusColors={statusColors}
            createIcon={createIcon}
          />
        </div>

      </div>
    </div>
  );
}
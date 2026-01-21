"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import react-leaflet components (SSR OFF)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Sample wildlife data
const wildlifeData = [
  {
    id: 1,
    animal: "Elephant",
    position: [6.4607, 80.75],
    location: "Udawalawe National Park",
  },
  {
    id: 2,
    animal: "Leopard",
    position: [6.3725, 81.5166],
    location: "Yala National Park",
  },
];

export default function WildlifeMap() {
  const [isClient, setIsClient] = useState(false);

  // ✅ Run Leaflet code ONLY on client
  useEffect(() => {
    setIsClient(true);

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });
    });
  }, []);

  // Prevent render until client-side
  if (!isClient) return null;

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {wildlifeData.map((item) => (
          <Marker
            key={item.id}
            position={item.position as [number, number]}
          >
            <Popup>
              <strong>{item.animal}</strong>
              <br />
              {item.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

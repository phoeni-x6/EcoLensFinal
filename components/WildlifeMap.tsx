"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { LatLngExpression } from "leaflet";
import type {
  MapContainerProps,
  TileLayerProps,
  MarkerProps,
  PopupProps,
} from "react-leaflet";

// Properly typed dynamic imports
const MapContainer = dynamic<MapContainerProps>(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic<TileLayerProps>(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic<MarkerProps>(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic<PopupProps>(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface MapImage {
  _id: string;
  speciesName: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
}

export default function WildlifeMap() {
  const [isClient, setIsClient] = useState(false);
  const [wildlifeData, setWildlifeData] = useState<MapImage[]>([]);
  const [loading, setLoading] = useState(true);

  const sriLankaCenter: LatLngExpression = [7.8731, 80.7718];

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

    fetch("/api/map-data")
      .then((res) => res.json())
      .then((data) => {
        setWildlifeData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Map fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (!isClient) return null;
  if (loading) return <p className="text-center mt-10">Loading map...</p>;

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={sriLankaCenter}
        zoom={7}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {wildlifeData.map((item) => {
          const position: LatLngExpression = [
            item.location.lat,
            item.location.lng,
          ];

          return (
            <Marker key={item._id} position={position}>
              <Popup>
                <strong>{item.speciesName}</strong>
                <br />
                {item.location.name}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

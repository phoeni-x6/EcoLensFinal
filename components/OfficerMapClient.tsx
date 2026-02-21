"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface Animal {
  id: string;
  name: string;
  status: "Critically Endangered" | "Endangered" | "Vulnerable";
  lat: number;
  lng: number;
  location: string;
}

interface Props {
  animals: Animal[];
  statusColors: Record<string, string>;
  createIcon: (color: string) => any;
}

export default function OfficerMapClient({
  animals,
  statusColors,
  createIcon,
}: Props) {
  const center: LatLngExpression = [7.8731, 80.7718];

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {animals.map((animal) => (
        <Marker
          key={animal.id}
          position={[animal.lat, animal.lng]}
          icon={createIcon(statusColors[animal.status])}
        >
          <Popup>
            <div>
              <strong>{animal.name}</strong>
              <br />
              Status: {animal.status}
              <br />
              Location: {animal.location}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
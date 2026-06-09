"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type TimeEntry = {
  lat: number;
  lng: number;
  name: string;
  time: string;
};

type Props = {
  entries: TimeEntry[];
};

export default function LeafletMap({ entries }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create map
    const map = L.map(mapRef.current).setView([0, 0], 2);

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add markers
    entries.forEach((entry) => {
      const marker = L.marker([entry.lat, entry.lng]).addTo(map);

      marker.bindPopup(`
        <strong>${entry.name}</strong><br>
        Time: ${entry.time}<br>
        Lat: ${entry.lat}<br>
        Lng: ${entry.lng}
      `);
    });

    // Fit map to markers
    if (entries.length > 0) {
      const bounds = L.latLngBounds(
        entries.map((e) => L.latLng(e.lat, e.lng))
      );
      map.fitBounds(bounds);
    }

    return () => {
      map.remove();
    };
  }, [entries]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", borderRadius: "8px" }}
    />
  );
}

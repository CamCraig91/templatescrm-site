"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [entries, setEntries] = useState<any[]>([]);

  // Load session data from API
  useEffect(() => {
    const session = new URLSearchParams(window.location.search).get("session");
    if (!session) return;

    fetch(`/api/map-session?session=${session}`)
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  // Render map once entries are loaded
  useEffect(() => {
    if (!mapRef.current || entries.length === 0) return;

    // Prevent re‑initializing the map
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;

    // Clear existing markers before adding new ones
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    const bounds: L.LatLngExpression[] = [];

    entries.forEach((entry: any) => {
      const pos: L.LatLngExpression = [entry.lat, entry.lng];

      const marker = L.marker(pos).addTo(map);

      marker.bindPopup(`
        <strong>${entry.name}</strong><br>
        Time: ${entry.time}<br>
        Lat: ${entry.lat}<br>
        Lng: ${entry.lng}
      `);

      bounds.push(pos);
    });

    // Only fit bounds if we have at least 2 points
    if (bounds.length > 1) {
      map.fitBounds(bounds as L.LatLngBoundsExpression);
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 14);
    }

    return () => {
      // Cleanup only when component unmounts
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [entries]);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Simple Templates banner */}
      <div
        style={{
          width: "100%",
          padding: "12px 20px",
          background: "#111",
          color: "#fff",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        Templates — Time Entry Map
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "calc(100vh - 56px)",
        }}
      />
    </div>
  );
}

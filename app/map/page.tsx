"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [L, setL] = useState<any>(null);

  // Load Leaflet ONLY in the browser
  useEffect(() => {
    async function loadLeaflet() {
      const leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      await import("leaflet-defaulticon-compatibility");
      await import("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css");

      setL(leaflet);
    }

    loadLeaflet();
  }, []);

  // Load session data from API
  useEffect(() => {
    if (typeof window === "undefined") return;

    const session = new URLSearchParams(window.location.search).get("session");
    if (!session) return;

    fetch(`/api/map-session?session=${session}`)
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  // Render map once entries + Leaflet are loaded
  useEffect(() => {
    if (!L) return; // Leaflet not loaded yet
    if (!mapRef.current || entries.length === 0) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;

    // Remove old markers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    const bounds: any[] = [];

    entries.forEach((entry: any) => {
      const pos = [entry.lat, entry.lng];

      const marker = L.marker(pos).addTo(map);

      marker.bindPopup(`
        <strong>${entry.name}</strong><br>
        Time: ${entry.time}<br>
        Lat: ${entry.lat}<br>
        Lng: ${entry.lng}
      `);

      bounds.push(pos);
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds);
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 14);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [entries, L]);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
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

"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  // Read entries from URL param: ?entries=[{...}]
  const entries = (() => {
    if (typeof window === "undefined") return [];
    try {
      const param = new URLSearchParams(window.location.search).get("entries");
      return param ? JSON.parse(param) : [];
    } catch {
      return [];
    }
  })();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map);

    const bounds: L.LatLngExpression[] = [];

    entries.forEach((entry: any) => {
      const marker = L.marker([entry.lat, entry.lng]).addTo(map);

      marker.bindPopup(`
        <strong>${entry.name}</strong><br>
        Time: ${entry.time}<br>
        Lat: ${entry.lat}<br>
        Lng: ${entry.lng}
      `);

      bounds.push([entry.lat, entry.lng]);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds);
    }

    return () => map.remove();
  }, []);

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
          fontWeight: 600
        }}
      >
        Templates — Time Entry Map
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "calc(100vh - 56px)" // subtract banner height
        }}
      />
    </div>
  );
}

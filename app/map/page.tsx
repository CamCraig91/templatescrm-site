"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = "pk.eyJ1IjoiY2FtZXJvbmNyYWlnY29uc3VsdGluZyIsImEiOiJjbTdzMWtqd28xY2Q5MmpvaDFmdHc0bHowIn0.KhWD9yj4e9h3K0UgSelWTw";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const [entries, setEntries] = useState<any[]>([]);
  const [L, setL] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionMissing, setSessionMissing] = useState(false);

  // Load Leaflet ONLY in the browser
  useEffect(() => {
    async function loadLeaflet() {
      try {
        const leaflet = await import("leaflet");
        await import("leaflet/dist/leaflet.css");
        await import("leaflet-defaulticon-compatibility");
        await import("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css");

        setL(leaflet);
      } catch (err) {
        setError("Failed to load map engine.");
      }
    }

    loadLeaflet();
  }, []);

  // Load session data from API
  useEffect(() => {
    if (typeof window === "undefined") return;

    const session = new URLSearchParams(window.location.search).get("session");

    if (!session) {
      setSessionMissing(true);
      setLoading(false);
      return;
    }

    fetch(`/api/map-session?session=${session}`)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load map data.");
        setLoading(false);
      });
  }, []);

  // Render map once entries + Leaflet are loaded
  useEffect(() => {
    if (!L || !mapRef.current || entries.length === 0) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([0, 0], 2);

      // ⭐ Mapbox tile layer
      L.tileLayer(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
        {
          maxZoom: 19,
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(mapInstance.current);
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
        Type: ${entry.type}<br>
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
  }, [entries, L]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: "70px",
          background: "#0A1A2F",
          display: "flex",
          alignItems: "center",
          paddingLeft: "24px",
          zIndex: 10,
          position: "relative",
        }}
      >
        <img
          src="/TemplatesLogoWhite.png"
          alt="Templates CRM Logo"
          style={{ height: "38px", pointerEvents: "none", userSelect: "none" }}
        />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 20,
            background: "#fff",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "5px solid rgba(0,0,0,0.2)",
              borderTop: "5px solid #0A1A2F",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "1rem",
            }}
          />
          <h2 style={{ color: "#0A1A2F", fontSize: "1.4rem" }}>Loading map…</h2>

          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      {/* Missing Session */}
      {sessionMissing && !loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 20,
            background: "#fff",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h2 style={{ color: "#0A1A2F", fontSize: "1.6rem", fontWeight: 700 }}>
            Missing session ID
          </h2>
          <p style={{ color: "#333", marginTop: "0.5rem" }}>
            This map link is invalid or expired.
          </p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 20,
            background: "#fff",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h2 style={{ color: "#B00020", fontSize: "1.6rem", fontWeight: 700 }}>
            Error loading map
          </h2>
          <p style={{ color: "#333", marginTop: "0.5rem" }}>{error}</p>
        </div>
      )}

      {/* Map */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "calc(100vh - 70px)",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}

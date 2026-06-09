"use client";

import { useEffect, useRef, useState } from "react";

type Pin = {
  id: number | null;
  lat: number;
  lng: number;
  [key: string]: any;
};

export default function MapPickerPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [L, setL] = useState<any>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Session data loaded from backend
  const [sessionData, setSessionData] = useState<any>(null);

  // Read session ID from URL
  const [sessionId] = useState(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("session")
      : null
  );

  // Status → color mapping
  const statusColors: Record<string, string> = {
    "Pending": "#FFD54F",
    "In Progress": "#42A5F5",
    "Completed": "#66BB6A",
    "Not Started": "#B0BEC5",
    "Closed": "#EF5350",
  };

  // Load Leaflet
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

  // Load session JSON from backend
  useEffect(() => {
    if (!sessionId) return;

    async function loadSession() {
      const res = await fetch(`/api/map-picker/session/${sessionId}`);
      const json = await res.json();
      setSessionData(json);

      setPins(json.pins || []);
      setFields(json.fields || []);
    }

    loadSession();
  }, [sessionId]);

  // Initialize map + render pins
  useEffect(() => {
    if (!L || !mapRef.current || !sessionData) return;

    const mapboxKey = sessionData.mapboxKey;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([44.0, -79.0], 10);

      L.tileLayer(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxKey}`,
        {
          maxZoom: 19,
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(mapInstance.current);

      // Click handler: create new pin with reverse geocoding
      mapInstance.current.on("click", async (e: any) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        let geoData: any = {};
        try {
          const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxKey}`
          );
          const json = await res.json();

          if (json.features?.length > 0) {
            const place = json.features[0];
            geoData = {
              address: place.place_name || "",
              businessName: place.text || "",
              category: place.properties?.category || "",
            };
          }
        } catch (err) {
          console.warn("Reverse geocoding failed", err);
        }

        const newPin: Pin = {
          id: null,
          lat,
          lng,
        };

        fields.forEach((f) => {
          if (geoData[f.key]) {
            newPin[f.key] = geoData[f.key];
          } else {
            newPin[f.key] = f.default ?? "";
          }
        });

        setPins((prev) => [...prev, newPin]);
        setSelectedPin(newPin);
        setSidebarOpen(true);
      });
    }

    const map = mapInstance.current;

    // Remove old markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    // Add markers with colored icons
    pins.forEach((pin) => {
      const status = (pin[sessionData.statusField] || "").toString();
      const color = statusColors[status] || "#607D8B";

      const icon = L.divIcon({
        className: "custom-pin-icon",
        html: `<div style="
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${color};
          border: 2px solid #fff;
          box-shadow: 0 0 4px rgba(0,0,0,0.4);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const marker = L.marker([pin.lat, pin.lng], {
        draggable: true,
        icon,
      }).addTo(map);

      marker.on("click", () => {
        setSelectedPin(pin);
        setSidebarOpen(true);
      });

      marker.on("dragend", (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        updatePin(pin, { lat, lng });
      });

      markersRef.current.push(marker);
    });
  }, [L, pins, sessionData]);

  // Update pin helper
  function updatePin(pin: Pin, updates: Partial<Pin>) {
    setPins((prev) =>
      prev.map((p) => (p === pin ? { ...p, ...updates } : p))
    );
    setSelectedPin((prev) => (prev === pin ? { ...prev, ...updates } : prev));
  }

  // Delete pin (only if id = null)
  function deletePin(pin: Pin) {
    setPins((prev) => prev.filter((p) => p !== pin));
    setSelectedPin(null);
    setSidebarOpen(false);
  }

  // Save & Close → send final JSON to backend
  async function saveAndClose() {
    await fetch(`/api/map-picker/session/${sessionId}/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pins }),
    });

    window.close();
  }

  // Search (forward geocoding)
  async function handleSearch() {
    if (!searchQuery.trim() || !sessionData) return;

    const mapboxKey = sessionData.mapboxKey;

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxKey}`
      );
      const json = await res.json();
      if (json.features?.length > 0) {
        const [lng, lat] = json.features[0].center;
        mapInstance.current.setView([lat, lng], 14);
      }
    } catch (err) {
      console.warn("Search failed", err);
    }
  }

  // Render dynamic fields
  function renderField(field: any, value: any, onChange: (v: any) => void) {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
          />
        );
      case "textarea":
        return (
          <textarea
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", height: "80px", padding: "8px", marginBottom: "12px" }}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
          />
        );
      case "datetime":
        return (
          <input
            type="datetime-local"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
          />
        );
      case "dropdown":
        return (
          <select
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
          >
            <option value="">Select...</option>
            {field.options?.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            style={{ marginBottom: "12px" }}
          />
        );
      default:
        return null;
    }
  }

  if (!sessionData) {
    return <div style={{ padding: 20 }}>Loading map session…</div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Map */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
        onClick={() => {
          if (sidebarOpen) {
            setSidebarOpen(false);
            setSelectedPin(null);
          }
        }}
      />

      {/* Top bar: search + Save */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          right: "10px",
          display: "flex",
          gap: "8px",
          zIndex: 40,
        }}
      >
        <input
          type="text"
          placeholder="Search address or place..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: "#1976D2",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Search
        </button>
        <button
          onClick={saveAndClose}
          style={{
            background: "#0A1A2F",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Save & Close
        </button>
      </div>

      {/* Slide-in Sidebar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: sidebarOpen ? 0 : "-340px",
          width: "340px",
          height: "100%",
          background: "#fff",
          boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
          padding: "20px",
          transition: "right 0.25s ease",
          zIndex: 30,
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
          }}
          onClick={() => {
            setSidebarOpen(false);
            setSelectedPin(null);
          }}
        >
          ×
        </div>

        {selectedPin ? (
          <>
            <h3 style={{ marginTop: 0 }}>Pin Details</h3>

            {fields.map((field) => (
              <div key={field.key}>
                <label style={{ fontWeight: 600 }}>{field.label}</label>
                {renderField(
                  field,
                  selectedPin[field.key],
                  (v) => updatePin(selectedPin, { [field.key]: v })
                )}
              </div>
            ))}

            <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
              <div>Lat: {selectedPin.lat.toFixed(6)}</div>
              <div>Lng: {selectedPin.lng.toFixed(6)}</div>
            </div>

            {selectedPin.id === null && (
              <button
                onClick={() => deletePin(selectedPin)}
                style={{
                  background: "#B00020",
                  color: "#fff",
                  padding: "10px 14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                Delete Pin
              </button>
            )}
          </>
        ) : (
          <p style={{ color: "#666" }}>Click a pin or map to add/edit.</p>
        )}
      </div>
    </div>
  );
}

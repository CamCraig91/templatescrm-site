"use client";

import { useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapPickerPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [L, setL] = useState<any>(null);
  const [pins, setPins] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [selectedPin, setSelectedPin] = useState<any | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Load initial pins + fields from URL
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const urlPins = params.get("pins");
    const urlFields = params.get("fields");

    if (urlPins) {
      try {
        setPins(JSON.parse(urlPins));
      } catch {
        console.warn("Invalid pins JSON");
      }
    }

    if (urlFields) {
      try {
        setFields(JSON.parse(urlFields));
      } catch {
        console.warn("Invalid fields JSON");
      }
    }
  }, []);

  // Initialize map + render pins
  useEffect(() => {
    if (!L || !mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([44.0, -79.0], 10);

      L.tileLayer(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
        {
          maxZoom: 19,
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(mapInstance.current);

      // Add click handler to create new pins
      mapInstance.current.on("click", (e: any) => {
        const newPin: any = {
          id: null,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };

        // Add dynamic fields with default values
        fields.forEach((f) => {
          newPin[f.key] = f.default ?? "";
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

    // Add markers
    pins.forEach((pin) => {
      const marker = L.marker([pin.lat, pin.lng], { draggable: true }).addTo(map);

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
  }, [L, pins, fields]);

  // Update pin helper
  function updatePin(pin: any, updates: any) {
    setPins((prev) =>
      prev.map((p) => (p === pin ? { ...p, ...updates } : p))
    );
    setSelectedPin((prev) => (prev === pin ? { ...prev, ...updates } : prev));
  }

  // Delete pin (only if id = null)
  function deletePin(pin: any) {
    setPins((prev) => prev.filter((p) => p !== pin));
    setSelectedPin(null);
    setSidebarOpen(false);
  }

  // Save & close → return JSON to Method
  function saveAndClose() {
    window.parent.postMessage(
      {
        type: "mapPickerResult",
        pins,
      },
      "*"
    );
    window.close();
  }

  // Render dynamic fields
  function renderField(field: any, value: any, onChange: (v: any) => void) {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
          />
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", height: "80px", padding: "8px", marginBottom: "12px" }}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
          />
        );

      case "datetime":
        return (
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
          />
        );

      case "dropdown":
        return (
          <select
            value={value}
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
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            style={{ marginBottom: "12px" }}
          />
        );

      default:
        return null;
    }
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
          zIndex: 20,
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
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

            {/* Dynamic fields */}
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

            {/* Coordinates (small + separate) */}
            <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
              <div>Lat: {selectedPin.lat.toFixed(6)}</div>
              <div>Lng: {selectedPin.lng.toFixed(6)}</div>
            </div>

            {/* Delete only if id = null */}
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
          <p style={{ color: "#666" }}>Click a pin to edit.</p>
        )}
      </div>

      {/* Save & Close button */}
      <button
        onClick={saveAndClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#0A1A2F",
          color: "#fff",
          padding: "12px 18px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 30,
          fontSize: "15px",
        }}
      >
        Save & Close
      </button>
    </div>
  );
}

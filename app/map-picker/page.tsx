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

  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      try {
        const leaflet = await import("leaflet");
        await import("leaflet/dist/leaflet.css");
        await import("leaflet-defaulticon-compatibility");
        await import("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css");
        setL(leaflet);
      } catch (err) {
        console.error("Failed to load Leaflet", err);
        setError("Failed to load map library");
      }
    }
    loadLeaflet();
  }, []);

  // Load session data from backend
  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found in URL");
      setLoading(false);
      return;
    }

    async function loadSession() {
      try {
        const res = await fetch(`/api/map-picker/session/${sessionId}`);

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }

        const json = await res.json();
        console.log("✅ Session data loaded:", json);

        setSessionData(json);
        setPins(json.pins || []);
        setFields(json.fields || []);
      } catch (err: any) {
        console.error("Session load error:", err);
        setError(err.message || "Failed to load session");
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [sessionId]);

  // Initialize map
  useEffect(() => {
    if (!L || !mapRef.current || !sessionData?.mapboxKey) return;
    if (mapInstance.current) return; // Prevent re-init

    try {
      mapInstance.current = L.map(mapRef.current).setView([44.0, -79.0], 10);

      const mapboxKey = sessionData.mapboxKey;

      L.tileLayer(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxKey}`,
        {
          maxZoom: 19,
          tileSize: 512,
          zoomOffset: -1,
          attribution: "© Mapbox",
        }
      ).addTo(mapInstance.current);

      // Click to add new pin
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

        const newPin: Pin = { id: null, lat, lng };

        fields.forEach((f) => {
          newPin[f.key] = geoData[f.key] ?? (f.default ?? "");
        });

        setPins((prev) => [...prev, newPin]);
        setSelectedPin(newPin);
        setSidebarOpen(true);
      });

    } catch (e) {
      console.error("Map initialization failed", e);
      setError("Failed to initialize map");
    }
  }, [L, sessionData, fields]);

  // Re-render markers when pins change
  useEffect(() => {
    if (!mapInstance.current || !L) return;

    // Clear old markers
    markersRef.current.forEach((m) => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    pins.forEach((pin) => {
      const status = (pin[sessionData?.statusField] || "").toString();
      const color = statusColors[status] || "#607D8B";

      const icon = L.divIcon({
        className: "custom-pin-icon",
        html: `<div style="width: 18px; height: 18px; border-radius: 50%; background: ${color}; border: 2px solid #fff; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const marker = L.marker([pin.lat, pin.lng], { draggable: true, icon }).addTo(mapInstance.current!);

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
  }, [pins, sessionData, L]);

  function updatePin(pin: Pin, updates: Partial<Pin>) {
    setPins((prev) =>
      prev.map((p) => (p === pin ? { ...p, ...updates } : p))
    );
    setSelectedPin((prev) => (prev === pin ? { ...prev, ...updates } : prev));
  }

  function deletePin(pin: Pin) {
    setPins((prev) => prev.filter((p) => p !== pin));
    setSelectedPin(null);
    setSidebarOpen(false);
  }

  async function saveAndClose() {
    if (!sessionId) return;
    try {
      await fetch(`/api/map-picker/session/${sessionId}/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pins }),
      });
      window.close();
    } catch (err) {
      alert("Failed to save. Please try again.");
    }
  }

  async function handleSearch() {
    if (!searchQuery.trim() || !sessionData?.mapboxKey || !mapInstance.current) return;

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${sessionData.mapboxKey}`
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

  function renderField(field: any, value: any, onChange: (v: any) => void) {
    switch (field.type) {
      case "text":
        return <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "12px" }} />;
      case "textarea":
        return <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", height: "80px", padding: "8px", marginBottom: "12px" }} />;
      case "number":
        return <input type="number" value={value ?? ""} onChange={(e) => onChange(Number(e.target.value))} style={{ width: "100%", padding: "8px", marginBottom: "12px" }} />;
      case "datetime":
        return <input type="datetime-local" value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "12px" }} />;
      case "dropdown":
        return (
          <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "12px" }}>
            <option value="">Select...</option>
            {field.options?.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case "checkbox":
        return <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} style={{ marginBottom: "12px" }} />;
      default:
        return null;
    }
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        <h2>Error</h2>
        <p>{error}</p>
        <p>Check console for details.</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100vh", background: "#fff", overflow: "hidden", position: "relative" }}>
      {/* Header */}
      <div style={{ height: "70px", background: "#0A1A2F", display: "flex", alignItems: "center", paddingLeft: "24px", zIndex: 10 }}>
        <img src="/TemplatesLogoWhite.png" alt="Templates CRM Logo" style={{ height: "38px" }} />
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fff", zIndex: 20 }}>
          <div style={{ width: "48px", height: "48px", border: "5px solid rgba(0,0,0,0.2)", borderTop: "5px solid #0A1A2F", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "1rem" }} />
          <h2 style={{ color: "#0A1A2F" }}>Loading map session…</h2>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Map Container */}
      <div style={{ width: "100%", height: "calc(100vh - 70px)", position: "relative" }}>
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

        {/* Top Controls */}
        {!loading && (
          <div style={{ position: "absolute", top: "10px", left: "10px", right: "10px", display: "flex", gap: "8px", zIndex: 40 }}>
            <input
              type="text"
              placeholder="Search address or place..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <button onClick={handleSearch} style={{ background: "#1976D2", color: "#fff", padding: "10px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
              Search
            </button>
            <button onClick={saveAndClose} style={{ background: "#0A1A2F", color: "#fff", padding: "10px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
              Save & Close
            </button>
          </div>
        )}

        {/* Sidebar */}
        {!loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: sidebarOpen ? 0 : "-360px",
              width: "360px",
              height: "100%",
              background: "#fff",
              boxShadow: "-3px 0 12px rgba(0,0,0,0.2)",
              padding: "20px",
              transition: "right 0.3s ease",
              zIndex: 30,
              overflowY: "auto",
            }}
          >
            <div style={{ fontSize: "28px", fontWeight: "bold", cursor: "pointer", textAlign: "right" }} onClick={() => { setSidebarOpen(false); setSelectedPin(null); }}>×</div>

            {selectedPin ? (
              <>
                <h3>Pin Details</h3>
                {fields.map((field) => (
                  <div key={field.key} style={{ marginBottom: "16px" }}>
                    <label style={{ fontWeight: 600, display: "block", marginBottom: "4px" }}>{field.label}</label>
                    {renderField(field, selectedPin[field.key], (v) => updatePin(selectedPin, { [field.key]: v }))}
                  </div>
                ))}

                <div style={{ marginTop: "20px", fontSize: "13px", color: "#666" }}>
                  <div>Lat: {selectedPin.lat.toFixed(6)}</div>
                  <div>Lng: {selectedPin.lng.toFixed(6)}</div>
                </div>

                {selectedPin.id === null && (
                  <button onClick={() => deletePin(selectedPin)} style={{ background: "#B00020", color: "#fff", padding: "12px", border: "none", borderRadius: "6px", width: "100%", marginTop: "20px", cursor: "pointer" }}>
                    Delete Pin
                  </button>
                )}
              </>
            ) : (
              <p style={{ color: "#666", marginTop: "40px" }}>Click on the map or a pin to edit details.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
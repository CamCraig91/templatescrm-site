"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
  const pinsRef = useRef<Pin[]>([]);          // ← always-current ref for closures
  const fieldsRef = useRef<any[]>([]);         // ← always-current ref for map click

  const [L, setL] = useState<any>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [pinListOpen, setPinListOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sessionId] = useState(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("session")
      : null
  );

  const statusColors: Record<string, string> = {
    "Pending": "#FFD54F",
    "In Progress": "#42A5F5",
    "Completed": "#66BB6A",
    "Not Started": "#B0BEC5",
    "Closed": "#EF5350",
  };

  // Keep refs in sync
  useEffect(() => { pinsRef.current = pins; }, [pins]);
  useEffect(() => { fieldsRef.current = fields; }, [fields]);

  // Derived selected pin from index
  const selectedPin = selectedIdx !== null ? pins[selectedIdx] ?? null : null;

  // ── Load Leaflet ──────────────────────────────────────────────────────────
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

  // ── Load Session ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!sessionId) {
      setError("No session ID in URL");
      setLoading(false);
      return;
    }

    async function loadSession() {
      try {
        const res = await fetch(`/api/map-picker/session/${sessionId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        console.log("📊 Session loaded:", json);

        setSessionData(json);

        const loadedFields = json.fields || [];
        setFields(loadedFields);
        fieldsRef.current = loadedFields;

        const loadedPins = (json.pins || []).map((p: any) => ({
          id: p.id ?? null,
          lat: parseFloat(p.lat ?? p.Latitude) || 0,
          lng: parseFloat(p.lng ?? p.Longitude) || 0,
          ...p,
        }));
        setPins(loadedPins);
        pinsRef.current = loadedPins;
      } catch (err: any) {
        console.error("Session load failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [sessionId]);

  // ── Initialize Map (once) ─────────────────────────────────────────────────
  useEffect(() => {
    if (!L || !mapRef.current || !sessionData?.mapboxKey || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([44.0, -79.0], 10);

    L.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${sessionData.mapboxKey}`,
      { maxZoom: 19, tileSize: 512, zoomOffset: -1 }
    ).addTo(mapInstance.current);

    // Use ref so this closure always sees current fields & pins
    mapInstance.current.on("click", (e: any) => {
      const { lat, lng } = e.latlng;
      const newPin: Pin = { id: null, lat, lng };
      fieldsRef.current.forEach((f: any) => { newPin[f.key] = f.default ?? ""; });

      setPins(prev => {
        const updated = [...prev, newPin];
        pinsRef.current = updated;
        const newIdx = updated.length - 1;
        setSelectedIdx(newIdx);
        setSidebarOpen(true);
        return updated;
      });
    });
  }, [L, sessionData]);

  // ── Render Markers ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !L) return;

    markersRef.current.forEach(m => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    pins.forEach((pin, idx) => {
      const isSelected = idx === selectedIdx;
      const status = (pin[sessionData?.statusField] || "").toString();
      const statusColor = statusColors[status] || "#607D8B";
      const fillColor = isSelected ? "#1976D2" : statusColor;
      const ringStyle = isSelected
        ? "border:3px solid #fff;box-shadow:0 0 0 3px #1976D2,0 2px 8px rgba(0,0,0,0.4);"
        : "border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.5);";

      const icon = L.divIcon({
        html: `<div style="width:18px;height:18px;border-radius:50%;background:${fillColor};${ringStyle}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const marker = L.marker([pin.lat, pin.lng], { draggable: true, icon })
        .addTo(mapInstance.current);

      marker.on("click", () => {
        setSelectedIdx(idx);
        setSidebarOpen(true);
        mapInstance.current.flyTo([pin.lat, pin.lng], 15);
      });

      marker.on("dragend", (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        setPins(prev => {
          const updated = prev.map((p, i) =>
            i === idx ? { ...p, lat, lng, _updated: true } : p
          );
          pinsRef.current = updated;
          return updated;
        });
        setSelectedIdx(idx);
      });

      markersRef.current.push(marker);
    });
  }, [pins, sessionData, L, selectedIdx]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const updatePin = useCallback((idx: number, updates: Partial<Pin>) => {
    setPins(prev => {
      const updated = prev.map((p, i) =>
        i === idx ? { ...p, ...updates, _updated: true } : p
      );
      pinsRef.current = updated;
      return updated;
    });
  }, []);

  const deletePin = useCallback((idx: number) => {
    setPins(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      pinsRef.current = updated;
      return updated;
    });
    setSelectedIdx(null);
    setSidebarOpen(false);
  }, []);

  const flyToPin = (pin: Pin, idx: number) => {
    if (mapInstance.current) mapInstance.current.flyTo([pin.lat, pin.lng], 15);
    setSelectedIdx(idx);
    setSidebarOpen(true);
    setPinListOpen(false);
  };

  const saveAndClose = async () => {
    if (!sessionId) return;
    await fetch(`/api/map-picker/session/${sessionId}/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pins: pinsRef.current }),
    });
    window.close();
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !sessionData?.mapboxKey || !mapInstance.current) return;
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${sessionData.mapboxKey}`
      );
      const json = await res.json();
      if (json.features?.length) {
        const [lng, lat] = json.features[0].center;
        mapInstance.current.flyTo([lat, lng], 14);
      }
    } catch (e) { console.warn(e); }
  };

  // ── Field Renderer ────────────────────────────────────────────────────────
  const renderField = (field: any, value: any, onChange: (v: any) => void) => {
    const inputStyle: React.CSSProperties = {
      width: "100%",
      padding: "9px 12px",
      borderRadius: "6px",
      border: "1px solid #e0e0e0",
      fontSize: "14px",
      boxSizing: "border-box",
      outline: "none",
      fontFamily: "inherit",
      color: "#1a1a1a",
    };
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            value={value ?? ""}
            onChange={e => onChange(e.target.value)}
            style={{ ...inputStyle, height: "90px", resize: "vertical" }}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={value ?? ""}
            onChange={e => onChange(Number(e.target.value))}
            style={inputStyle}
          />
        );
      case "datetime":
        return (
          <input
            type="datetime-local"
            value={value ?? ""}
            onChange={e => onChange(e.target.value)}
            style={inputStyle}
          />
        );
      case "dropdown":
        return (
          <select
            value={value ?? ""}
            onChange={e => onChange(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select...</option>
            {field.options?.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={value ?? ""}
            onChange={e => onChange(e.target.value)}
            style={inputStyle}
          />
        );
    }
  };

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) return (
    <div style={{ padding: 40, color: "#B00020", fontFamily: "sans-serif" }}>
      Error: {error}
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden", fontFamily: "system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{
        height: "52px",
        background: "#0A1A2F",
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        gap: "10px",
        zIndex: 100,
        position: "relative",
      }}>
        <img src="/TemplatesLogoWhite.png" alt="Logo" style={{ height: "30px" }} />

        <div style={{ flex: 1 }} />

        {/* Search */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search address..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
              fontSize: "13px",
              width: "200px",
              background: "#fff",
              outline: "none",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "5px 12px",
              background: "#1976D2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Search
          </button>
          <button
            onClick={saveAndClose}
            style={{
              padding: "5px 12px",
              background: "transparent",
              color: "white",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: "5px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Save & Close
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ position: "relative", height: "calc(100vh - 52px)" }}>

        {/* ── Map ── */}
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

        {/* ── Pin count chip (floating top-left) ── */}
        {pins.length > 0 && (
          <div
            onClick={() => setPinListOpen(o => !o)}
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              zIndex: 800,
              background: "#0A1A2F",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              userSelect: "none",
            }}
          >
            📍 Pins ({pins.length})
          </div>
        )}

        {/* ── Pin List Dropdown ── */}
        {pinListOpen && pins.length > 0 && (
          <div style={{
            position: "absolute",
            top: "48px",
            left: "12px",
            zIndex: 800,
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            width: "260px",
            maxHeight: "340px",
            overflowY: "auto",
            padding: "8px",
          }}>
            {pins.map((pin, idx) => (
              <div
                key={idx}
                onClick={() => flyToPin(pin, idx)}
                style={{
                  padding: "10px 12px",
                  marginBottom: "4px",
                  background: selectedIdx === idx ? "#e3f2fd" : "#fafafa",
                  border: `1px solid ${selectedIdx === idx ? "#90caf9" : "#eee"}`,
                  borderRadius: "7px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                <strong style={{ color: "#0A1A2F" }}>Pin {idx + 1}</strong>
                <span style={{ color: "#555", marginLeft: "6px" }}>
                  {pin[fields[1]?.key] || "Unnamed"}
                </span>
                <br />
                <small style={{ color: "#999" }}>
                  {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                </small>
                {pin._updated && (
                  <span style={{ color: "#1976D2", fontSize: "11px", marginLeft: "6px" }}>• edited</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Sidebar ── */}
        {sidebarOpen && selectedPin && selectedIdx !== null && (
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "360px",
            height: "100%",
            background: "#fff",
            boxShadow: "-4px 0 24px rgba(0,0,0,0.18)",
            zIndex: 900,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}>
            {/* Sidebar header */}
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fff",
            }}>
              <span style={{ fontWeight: 700, fontSize: "15px", color: "#0A1A2F" }}>
                Pin {selectedIdx + 1}
              </span>
              <span
                onClick={() => { setSidebarOpen(false); setSelectedIdx(null); }}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#999",
                  lineHeight: 1,
                  padding: "2px 6px",
                }}
              >
                ×
              </span>
            </div>

            {/* Sidebar body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              {fields.map(field => (
                <div key={field.key} style={{ marginBottom: "18px" }}>
                  <label style={{
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#000",
                    display: "block",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}>
                    {field.label}
                  </label>
                  {renderField(
                    field,
                    selectedPin[field.key],
                    (v) => updatePin(selectedIdx, { [field.key]: v })
                  )}
                </div>
              ))}

              {/* Location */}
              <div style={{ marginTop: "8px", paddingTop: "16px", borderTop: "1px solid #f0f0f0" }}>
                <span style={{ fontWeight: 700, fontSize: "12px", color: "#000", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Location
                </span>
                <div style={{ marginTop: "6px", fontSize: "13px", color: "#444" }}>
                  <strong>Lat</strong> {selectedPin.lat.toFixed(6)} &nbsp;
                  <strong>Lng</strong> {selectedPin.lng.toFixed(6)}
                </div>
              </div>

              {selectedPin.id === null && (
                <button
                  onClick={() => deletePin(selectedIdx)}
                  style={{
                    marginTop: "24px",
                    width: "100%",
                    padding: "12px",
                    background: "#B00020",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Delete Pin
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Loading overlay ── */}
      {loading && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.96)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          fontSize: "15px",
          color: "#0A1A2F",
          fontWeight: 600,
        }}>
          Loading session...
        </div>
      )}
    </div>
  );
}
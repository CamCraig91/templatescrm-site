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

  const [sessionId] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("session") : null
  );

  const statusColors: Record<string, string> = {
    "Pending": "#FFD54F", "In Progress": "#42A5F5", "Completed": "#66BB6A",
    "Not Started": "#B0BEC5", "Closed": "#EF5350",
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

  // Load Session (should contain both config + existing pins)
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
        console.log("📊 Full Session Data:", json);

        setSessionData(json);
        setPins(json.pins || []);        // ← Existing pins from Method
        setFields(json.fields || []);
      } catch (err: any) {
        console.error("Session load failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, [sessionId]);

  // Initialize Map
  useEffect(() => {
    if (!L || !mapRef.current || !sessionData?.mapboxKey || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([44.0, -79.0], 10);

    L.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${sessionData.mapboxKey}`,
      { maxZoom: 19, tileSize: 512, zoomOffset: -1 }
    ).addTo(mapInstance.current);

    // Click map to create new pin
    mapInstance.current.on("click", (e: any) => {
      const { lat, lng } = e.latlng;
      console.log("🖱️ Map clicked:", { lat, lng });

      const newPin: Pin = { id: null, lat, lng };
      fields.forEach(f => newPin[f.key] = f.default ?? "");

      setPins(prev => [...prev, newPin]);
      setSelectedPin(newPin);
      setSidebarOpen(true);
    });
  }, [L, sessionData, fields]);

  // Render Markers with hover/click feedback
  useEffect(() => {
    if (!mapInstance.current || !L) return;

    markersRef.current.forEach(m => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    console.log(`Rendering ${pins.length} pins`);

    pins.forEach((pin) => {
      const status = (pin[sessionData?.statusField] || "").toString();
      const color = statusColors[status] || "#607D8B";

      const icon = L.divIcon({
        html: `<div style="width:20px;height:20px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 0 6px rgba(0,0,0,0.6);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([pin.lat, pin.lng], { draggable: true, icon }).addTo(mapInstance.current);

      marker.on("click", () => {
        setSelectedPin(pin);
        setSidebarOpen(true);
        mapInstance.current.flyTo([pin.lat, pin.lng], 15);
      });

      marker.on("dragend", (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        updatePin(pin, { lat, lng });
      });

      markersRef.current.push(marker);
    });
  }, [pins, sessionData, L]);

  const updatePin = (pin: Pin, updates: Partial<Pin>) => {
    setPins(prev => prev.map(p => p === pin ? { ...p, ...updates, _updated: true } : p));
    setSelectedPin(prev => prev === pin ? { ...prev, ...updates, _updated: true } : prev);
  };

  const deletePin = (pin: Pin) => {
    setPins(prev => prev.filter(p => p !== pin));
    setSelectedPin(null);
    setSidebarOpen(false);
  };

  const flyToPin = (pin: Pin) => {
    if (mapInstance.current) mapInstance.current.flyTo([pin.lat, pin.lng], 15);
    setSelectedPin(pin);
    setSidebarOpen(true);
  };

  const saveAndClose = async () => {
    if (!sessionId) return;
    await fetch(`/api/map-picker/session/${sessionId}/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pins }),
    });
    window.close();
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !sessionData?.mapboxKey || !mapInstance.current) return;
    try {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${sessionData.mapboxKey}`);
      const json = await res.json();
      if (json.features?.length) {
        const [lng, lat] = json.features[0].center;
        mapInstance.current.flyTo([lat, lng], 14);
      }
    } catch (e) { console.warn(e); }
  };

  const renderField = (field: any, value: any, onChange: (v: any) => void) => {
    switch (field.type) {
      case "text": return <input type="text" value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"6px", border:"1px solid #ddd"}} />;
      case "textarea": return <textarea value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", height:"100px", padding:"10px", borderRadius:"6px", border:"1px solid #ddd"}} />;
      case "number": return <input type="number" value={value ?? ""} onChange={e => onChange(Number(e.target.value))} style={{width:"100%", padding:"10px", borderRadius:"6px", border:"1px solid #ddd"}} />;
      case "datetime": return <input type="datetime-local" value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"6px", border:"1px solid #ddd"}} />;
      case "dropdown": return (
        <select value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"6px", border:"1px solid #ddd"}}>
          <option value="">Select...</option>
          {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
      default: return <input type="text" value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"6px", border:"1px solid #ddd"}} />;
    }
  };

  if (error) return <div style={{padding:40, color:"red"}}>Error: {error}</div>;

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ height: "64px", background: "#0A1A2F", display: "flex", alignItems: "center", padding: "0 16px", gap: "12px", zIndex: 100 }}>
        <img src="/TemplatesLogoWhite.png" alt="Logo" style={{ height: "36px" }} />
        <div style={{ flex: 1, display: "flex", gap: "8px", maxWidth: "460px", marginLeft: "auto" }}>
          <input type="text" placeholder="Search address..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "none" }} />
          <button onClick={handleSearch} style={{ padding: "8px 20px", background: "#1976D2", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Search</button>
          <button onClick={saveAndClose} style={{ padding: "8px 20px", background: "#0A1A2F", color: "white", border: "1px solid #fff", borderRadius: "6px", cursor: "pointer" }}>Save & Close</button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {/* Pin List */}
        <div style={{ width: "280px", background: "#f8f9fa", borderRight: "1px solid #ddd", overflowY: "auto", padding: "16px" }}>
          <h4>Pins ({pins.length})</h4>
          {pins.length === 0 ? <p>No pins loaded yet.</p> : pins.map((pin, idx) => (
            <div key={idx} onClick={() => flyToPin(pin)} style={{ padding: "12px", marginBottom: "8px", background: selectedPin === pin ? "#e3f2fd" : "#fff", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer" }}>
              <strong>Pin {idx + 1}</strong><br />
              {pin[fields[1]?.key] || "Unnamed"}<br />
              <small>Lat: {pin.lat.toFixed(4)}, Lng: {pin.lng.toFixed(4)}</small>
              {pin._updated && <span style={{color:"#1976D2"}}> • Updated</span>}
            </div>
          ))}
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: "relative" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

          {/* Sidebar */}
          {sidebarOpen && selectedPin && (
            <div style={{ position: "absolute", top: 0, right: 0, width: "400px", height: "100%", background: "#fff", boxShadow: "-4px 0 20px rgba(0,0,0,0.3)", zIndex: 900, padding: "24px", overflowY: "auto" }}>
              <div style={{ fontSize: "36px", textAlign: "right", cursor: "pointer" }} onClick={() => { setSidebarOpen(false); setSelectedPin(null); }}>×</div>
              <h2>Pin Details</h2>

              {fields.map(field => (
                <div key={field.key} style={{ marginBottom: "20px" }}>
                  <label style={{ fontWeight: 700, display: "block", marginBottom: "6px" }}>{field.label}</label>
                  {renderField(field, selectedPin[field.key], (v) => updatePin(selectedPin, { [field.key]: v }))}
                </div>
              ))}

              <div style={{ marginTop: "30px", padding: "12px", background: "#f5f5f5", borderRadius: "8px" }}>
                <strong>📍 Location</strong><br />
                Lat: {selectedPin.lat.toFixed(6)}<br />
                Lng: {selectedPin.lng.toFixed(6)}
              </div>

              {selectedPin.id === null && (
                <button onClick={() => deletePin(selectedPin)} style={{ marginTop: "24px", width: "100%", padding: "14px", background: "#B00020", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}>
                  Delete Pin
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {loading && <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>Loading session...</div>}
    </div>
  );
}
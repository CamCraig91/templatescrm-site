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
  const [pinListOpen, setPinListOpen] = useState(false);

  const [sessionId] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("session") : null
  );

  const statusColors: Record<string, string> = {
    "Pending": "#FFD54F", "In Progress": "#42A5F5", "Completed": "#66BB6A",
    "Not Started": "#B0BEC5", "Closed": "#EF5350",
  };

  // Load Leaflet + Session (same as before)
  useEffect(() => { /* ... Leaflet load ... */ }, []);
  useEffect(() => { /* ... Session load ... */ }, [sessionId]);

  // Map init + click handler (same)
  useEffect(() => { /* ... map init ... */ }, [L, sessionData, fields]);

  // Markers (same)
  useEffect(() => { /* ... render markers ... */ }, [pins, sessionData, L]);

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

  const handleSearch = async () => { /* ... same ... */ };

  const renderField = (field: any, value: any, onChange: (v: any) => void) => {
    const isReadonly = field.type === "readonly";
    return (
      <input
        type={field.type === "datetime" ? "datetime-local" : "text"}
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
        readOnly={isReadonly}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: isReadonly ? "#f5f5f5" : "white",
          color: isReadonly ? "#555" : "black"
        }}
      />
    );
  };

  if (error) return <div style={{padding:40, color:"red"}}>Error: {error}</div>;

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Header - Cleaner */}
      <div style={{ height: "56px", background: "#0A1A2F", display: "flex", alignItems: "center", padding: "0 16px", gap: "12px", zIndex: 100 }}>
        <img src="/TemplatesLogoWhite.png" alt="Logo" style={{ height: "32px" }} />
        
        <div style={{ flex: 1, display: "flex", gap: "8px", maxWidth: "420px", marginLeft: "auto" }}>
          <input
            type="text"
            placeholder="Search address..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: "7px 12px", borderRadius: "6px", border: "none", fontSize: "14px" }}
          />
          <button onClick={handleSearch} style={{ padding: "7px 16px", background: "#1976D2", color: "white", border: "none", borderRadius: "6px", fontSize: "14px", cursor: "pointer" }}>
            Search
          </button>
          <button onClick={saveAndClose} style={{ padding: "7px 16px", background: "#0A1A2F", color: "white", border: "1px solid #fff", borderRadius: "6px", fontSize: "14px", cursor: "pointer" }}>
            Save & Close
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
        {/* Collapsible Pin List */}
        <div style={{ width: "260px", background: "#f8f9fa", borderRight: "1px solid #ddd", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div 
            onClick={() => setPinListOpen(!pinListOpen)}
            style={{ padding: "14px 16px", background: "#fff", borderBottom: "1px solid #ddd", cursor: "pointer", fontWeight: 600 }}
          >
            Pins ({pins.length})
          </div>
          
          {pinListOpen && (
            <div style={{ overflowY: "auto", flex: 1, padding: "8px" }}>
              {pins.length === 0 ? (
                <p style={{ padding: "12px", color: "#666" }}>No pins yet</p>
              ) : (
                pins.map((pin, idx) => (
                  <div key={idx} onClick={() => flyToPin(pin)} style={{
                    padding: "12px", marginBottom: "6px", background: selectedPin === pin ? "#e3f2fd" : "#fff",
                    border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", fontSize: "14px"
                  }}>
                    <strong>Pin {idx + 1}</strong><br />
                    {pin.Name || pin["CustomScheduleRecordIDContactRecordIDName"] || "Unnamed"}<br />
                    <small>Lat: {pin.lat.toFixed(4)}, Lng: {pin.lng.toFixed(4)}</small>
                    {pin._updated && <span style={{color: "#1976D2"}}> • Updated</span>}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: "relative" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

          {/* Sidebar */}
          {sidebarOpen && selectedPin && (
            <div style={{ position: "absolute", top: 0, right: 0, width: "400px", height: "100%", background: "#fff", boxShadow: "-4px 0 20px rgba(0,0,0,0.25)", zIndex: 900, padding: "20px", overflowY: "auto" }}>
              <div style={{ fontSize: "36px", textAlign: "right", cursor: "pointer", marginBottom: "10px" }} onClick={() => { setSidebarOpen(false); setSelectedPin(null); }}>×</div>
              
              <h2 style={{ marginTop: 0 }}>Pin Details</h2>

              {fields.map(field => (
                <div key={field.key} style={{ marginBottom: "18px" }}>
                  <label style={{ fontWeight: 700, display: "block", marginBottom: "6px", color: "#111" }}>{field.label}</label>
                  {renderField(field, selectedPin[field.key], (v) => updatePin(selectedPin, { [field.key]: v }))}
                </div>
              ))}

              <div style={{ marginTop: "24px", fontSize: "15px" }}>
                <strong>📍 Location</strong><br />
                Lat: {selectedPin.lat.toFixed(6)}<br />
                Lng: {selectedPin.lng.toFixed(6)}
              </div>

              {selectedPin.id === null && (
                <button onClick={() => deletePin(selectedPin)} style={{ marginTop: "30px", width: "100%", padding: "14px", background: "#B00020", color: "white", border: "none", borderRadius: "8px" }}>
                  Delete Pin
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {loading && <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.95)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}
    </div>
  );
}
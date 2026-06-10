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

  // Load session
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
        console.log("📊 Full session data:", json);

        setSessionData(json);
        setPins(json.pins || []);
        setFields(json.fields || []);
      } catch (err: any) {
        console.error("❌ Session load failed:", err);
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
      { maxZoom: 19, tileSize: 512, zoomOffset: -1, attribution: "© Mapbox" }
    ).addTo(mapInstance.current);

    // Click to add pin
    mapInstance.current.on("click", async (e: any) => {
      console.log("🖱️ Map clicked at:", e.latlng);
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      const newPin: Pin = { id: null, lat, lng };

      fields.forEach((f) => {
        newPin[f.key] = f.default ?? "";
      });

      setPins((prev) => [...prev, newPin]);
      setSelectedPin(newPin);
      setSidebarOpen(true);
    });
  }, [L, sessionData, fields]);

  // Render / Update Markers
  useEffect(() => {
    if (!mapInstance.current || !L) return;

    markersRef.current.forEach(m => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    console.log(`Rendering ${pins.length} pins`);

    pins.forEach((pin, index) => {
      const status = (pin[sessionData?.statusField] || "").toString();
      const color = statusColors[status] || "#607D8B";

      const icon = L.divIcon({
        html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 4px rgba(0,0,0,0.4);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const marker = L.marker([pin.lat, pin.lng], { draggable: true, icon }).addTo(mapInstance.current);

      marker.on("click", () => {
        console.log("📍 Pin clicked:", pin);
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

  const updatePin = (pin: Pin, updates: Partial<Pin>) => {
    setPins(prev => prev.map(p => p === pin ? { ...p, ...updates } : p));
    setSelectedPin(prev => prev === pin ? { ...prev, ...updates } : prev);
  };

  const deletePin = (pin: Pin) => {
    setPins(prev => prev.filter(p => p !== pin));
    setSelectedPin(null);
    setSidebarOpen(false);
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
    if (!searchQuery || !sessionData?.mapboxKey || !mapInstance.current) return;
    // ... (search code same as before)
    try {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${sessionData.mapboxKey}`);
      const json = await res.json();
      if (json.features?.length) {
        const [lng, lat] = json.features[0].center;
        mapInstance.current.setView([lat, lng], 14);
      }
    } catch (e) { console.warn(e); }
  };

  const renderField = (field: any, value: any, onChange: (v: any) => void) => {
    // ... (same as before - keep your original renderField)
    switch (field.type) {
      case "text": return <input type="text" value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", padding:"8px", marginBottom:"12px"}} />;
      case "textarea": return <textarea value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", height:"80px", padding:"8px", marginBottom:"12px"}} />;
      case "number": return <input type="number" value={value ?? ""} onChange={e => onChange(Number(e.target.value))} style={{width:"100%", padding:"8px", marginBottom:"12px"}} />;
      case "dropdown": return (
        <select value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", padding:"8px", marginBottom:"12px"}}>
          <option value="">Select...</option>
          {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
      default: return <input type="text" value={value ?? ""} onChange={e => onChange(e.target.value)} style={{width:"100%", padding:"8px", marginBottom:"12px"}} />;
    }
  };

  if (error) return <div style={{padding:40, color:"red"}}><h2>Error: {error}</h2><p>Check console</p></div>;

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ height: "70px", background: "#0A1A2F", display: "flex", alignItems: "center", paddingLeft: "24px", zIndex: 100 }}>
        <img src="/TemplatesLogoWhite.png" alt="Logo" style={{ height: "38px" }} />
      </div>

      {loading && (
        <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", background:"#fff", zIndex:200}}>
          <div style={{width:"48px",height:"48px",border:"5px solid #ddd", borderTopColor:"#0A1A2F", borderRadius:"50%", animation:"spin 1s linear infinite"}} />
          <h2>Loading map...</h2>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {/* Map */}
      <div style={{ width: "100%", height: "calc(100vh - 70px)", position: "relative" }}>
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

        {/* Top Controls - Always visible after load */}
        {!loading && (
          <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", display: "flex", gap: "8px", zIndex: 1000 }}>
            <input
              type="text" placeholder="Search address..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <button onClick={handleSearch} style={{padding:"10px 16px", background:"#1976D2", color:"white", border:"none", borderRadius:"6px"}}>Search</button>
            <button onClick={saveAndClose} style={{padding:"10px 16px", background:"#0A1A2F", color:"white", border:"none", borderRadius:"6px"}}>Save & Close</button>
          </div>
        )}

        {/* Sidebar */}
        {!loading && (
          <div style={{
            position: "absolute", top: 0, right: sidebarOpen ? "0" : "-380px",
            width: "380px", height: "100%", background: "#fff", boxShadow: "-4px 0 15px rgba(0,0,0,0.2)",
            transition: "right 0.3s ease", zIndex: 900, padding: "20px", overflowY: "auto"
          }}>
            <div style={{ fontSize: "32px", cursor: "pointer", textAlign: "right" }} onClick={() => {setSidebarOpen(false); setSelectedPin(null);}}>×</div>

            {selectedPin ? (
              <>
                <h3>Pin Details</h3>
                {fields.length === 0 ? <p>No fields configured</p> : fields.map(field => (
                  <div key={field.key} style={{marginBottom: "18px"}}>
                    <label style={{fontWeight:600, display:"block", marginBottom:"6px"}}>{field.label}</label>
                    {renderField(field, selectedPin[field.key], (v) => updatePin(selectedPin, {[field.key]: v}))}
                  </div>
                ))}
                <div style={{marginTop:"20px", fontSize:"13px", color:"#555"}}>
                  Lat: {selectedPin.lat.toFixed(6)}<br />
                  Lng: {selectedPin.lng.toFixed(6)}
                </div>
                {selectedPin.id === null && <button onClick={() => deletePin(selectedPin)} style={{marginTop:"20px", width:"100%", padding:"12px", background:"#B00020", color:"white", border:"none", borderRadius:"6px"}}>Delete Pin</button>}
              </>
            ) : (
              <p style={{marginTop:"50px", color:"#666", textAlign:"center"}}>Click map or existing pin to edit</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
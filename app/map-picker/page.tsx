"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type FieldType = "text" | "textarea" | "number" | "datetime" | "dropdown" | "readonly" | "linked";

type Field = {
  key:             string;
  label:           string;
  type:            FieldType;
  options?:        string[];
  default?:        any;
  hidden?:         boolean;
  pinLabel?:       boolean;
  pinColor?:       boolean;
  geocode?:        string;
  showOnNew?:      boolean;
  showOnExisting?: boolean;
  editOnNew?:      boolean;
  editOnExisting?: boolean;
};

type Pin = {
  id:  string | number | null;
  lat: number;
  lng: number;
  [key: string]: any;
};

type GeoPopup = {
  lat:       number;
  lng:       number;
  screenX:   number;
  screenY:   number;
  props:     Record<string, string>;
  loading:   boolean;
};

// ── Colour map ────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  "Completed":   "#43A047", "Approved":  "#43A047", "Accepted":    "#43A047", "Done":        "#43A047",
  "In Progress": "#1976D2", "Active":    "#1976D2", "Started":     "#1976D2", "Shift Start": "#1976D2",
  "Pending":     "#FFB300", "Not Started":"#FFB300","Scheduled":   "#FFB300",
  "Cancelled":   "#E53935", "Closed":    "#E53935", "Rejected":    "#E53935", "Failed":      "#E53935",
  "Shift End":   "#78909C", "On Hold":   "#78909C",
};

export default function MapPickerPage() {
  const mapRef      = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef  = useRef<any[]>([]);
  const userMarker  = useRef<any>(null);
  const pinsRef     = useRef<Pin[]>([]);
  const fieldsRef   = useRef<Field[]>([]);
  const sessionRef  = useRef<any>(null);

  const [L,           setL]           = useState<any>(null);
  const [pins,        setPins]        = useState<Pin[]>([]);
  const [fields,      setFields]      = useState<Field[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [draftPin,    setDraftPin]    = useState<Pin | null>(null);   // unsaved new pin in sidebar
  const [geoPopup,    setGeoPopup]    = useState<GeoPopup | null>(null);
  const [pinBounds,   setPinBounds]   = useState<[number,number][] | null>(null);
  const [pinListOpen, setPinListOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [userPos,     setUserPos]     = useState<[number,number] | null>(null);
  const [locationAllowed, setLocationAllowed] = useState(false);

  const [sessionId] = useState(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("session")
      : null
  );

  useEffect(() => { pinsRef.current   = pins;        }, [pins]);
  useEffect(() => { fieldsRef.current = fields;      }, [fields]);
  useEffect(() => { sessionRef.current = sessionData; }, [sessionData]);

  const selectedPin  = selectedIdx !== null ? pins[selectedIdx] ?? null : null;
  const allowNewPins = sessionData?.allowNewPins !== false;
  const viewOnly     = sessionData?.viewOnly === true;

  // ── Field helpers ─────────────────────────────────────────────────────────
  const isFieldVisible = (f: Field, isNew: boolean) => {
    if (f.hidden) return false;
    return isNew ? f.showOnNew !== false : f.showOnExisting !== false;
  };

  const isFieldEditable = (f: Field, isNew: boolean) => {
    if (viewOnly) return false;
    if (f.type === "readonly" || f.type === "linked") return false;
    return isNew ? f.editOnNew !== false : f.editOnExisting !== false;
  };

  const getPinLabel = useCallback((pin: Pin) => {
    const f = fieldsRef.current.find(f => f.pinLabel);
    if (f && pin[f.key]) return String(pin[f.key]);
    for (const k of ["Name","name","Title","title"]) if (pin[k]) return String(pin[k]);
    return "";
  }, []);

  const getPinColor = useCallback((pin: Pin, isSelected: boolean) => {
    if (isSelected) return "#1976D2";
    const f = fieldsRef.current.find(f => f.pinColor);
    const v = f ? String(pin[f.key] || "") : "";
    return STATUS_COLORS[v] || "#607D8B";
  }, []);

  // ── Reverse geocode ───────────────────────────────────────────────────────
  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<Record<string,string>> => {
    const key = sessionRef.current?.mapboxKey;
    if (!key) return {};
    try {
      const res  = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=poi,address&limit=1&access_token=${key}`
      );
      const json = await res.json();
      const feat = json.features?.[0];
      if (!feat) return {};

      const props: Record<string,string> = {};

      // Business name — only if it's a POI (place_type includes "poi")
      if (feat.place_type?.includes("poi")) {
        props.place_name = feat.text || "";
      }

      // Full formatted address
      props.full_address = feat.place_name || "";

      // Street address (number + street)
      props.address = feat.properties?.address || feat.place_name?.split(",")[0] || "";

      // Category
      props.category = feat.properties?.category || "";

      // Contact
      props.phone   = feat.properties?.tel     || "";
      props.website = feat.properties?.website || "";

      // Context: city, region/province, postcode, country
      (feat.context || []).forEach((ctx: any) => {
        const id = ctx.id || "";
        if (id.startsWith("place"))    props.city     = ctx.text || "";
        if (id.startsWith("district")) props.district = ctx.text || "";
        if (id.startsWith("region"))   props.province = ctx.text || "";
        if (id.startsWith("postcode")) props.postcode = ctx.text || "";
        if (id.startsWith("country"))  props.country  = ctx.text || "";
      });

      return props;
    } catch { return {}; }
  }, []);

  // ── Leaflet ───────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      await import("leaflet-defaulticon-compatibility");
      await import("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css");
      setL(leaflet);
    })();
  }, []);

  // ── Session ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!sessionId) { setError("No session ID in URL"); setLoading(false); return; }
    (async () => {
      try {
        const res  = await fetch(`/api/map-picker/session/${sessionId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const loadedFields: Field[] = json.fields || [];
        const loadedPins: Pin[]     = (json.pins || []).map((p: any) => ({
          ...p,
          id:  p.id  ?? null,
          lat: parseFloat(p.lat  ?? p.Latitude)  || 0,
          lng: parseFloat(p.lng  ?? p.Longitude) || 0,
        }));
        setSessionData(json);
        setFields(loadedFields);
        fieldsRef.current = loadedFields;
        setPins(loadedPins);
        pinsRef.current = loadedPins;
        if (loadedPins.length) setPinBounds(loadedPins.map(p => [p.lat, p.lng]));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  // ── User location — explicit permission request ───────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.permissions?.query({ name: "geolocation" }).then(result => {
      if (result.state === "granted") {
        startWatching();
      } else if (result.state === "prompt") {
        // Will ask when we call watchPosition
        startWatching();
      }
      // If "denied", do nothing — no dot shown
    }).catch(() => startWatching()); // fallback if permissions API unavailable

    function startWatching() {
      const id = navigator.geolocation.watchPosition(
        pos => {
          setLocationAllowed(true);
          setUserPos([pos.coords.latitude, pos.coords.longitude]);
        },
        () => setLocationAllowed(false),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
      return () => navigator.geolocation.clearWatch(id);
    }
  }, []);

  // ── User location marker ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !L || !userPos || !locationAllowed) return;
    if (userMarker.current) mapInstance.current.removeLayer(userMarker.current);

    // Distinct pulsing blue dot clearly different from data pins
    const icon = L.divIcon({
      html: `
        <div style="position:relative;width:20px;height:20px;">
          <div style="position:absolute;inset:0;border-radius:50%;background:rgba(25,118,210,0.2);animation:pulse 2s infinite;"></div>
          <div style="position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#1976D2;border:2px solid #fff;box-shadow:0 0 6px rgba(25,118,210,0.6);"></div>
        </div>
        <style>@keyframes pulse{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(2);opacity:0}}</style>
      `,
      iconSize: [20,20], iconAnchor: [10,10], className: "",
    });
    userMarker.current = L.marker(userPos, { icon, zIndexOffset: 2000, interactive: false })
      .addTo(mapInstance.current);
  }, [L, userPos, locationAllowed]);

  // ── Init map ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!L || !mapRef.current || !sessionData?.mapboxKey || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([44.0, -79.0], 10);
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${sessionData.mapboxKey}`,
      { maxZoom: 19, tileSize: 512, zoomOffset: -1 }
    ).addTo(mapInstance.current);

    mapInstance.current.on("click", async (e: any) => {
      if (!sessionRef.current) return;
      if (sessionRef.current.allowNewPins === false) return;
      if (sessionRef.current.viewOnly === true) return;

      const { lat, lng } = e.latlng;

      // Get screen position of click for popup placement
      const point   = mapInstance.current.latLngToContainerPoint([lat, lng]);
      const mapRect = mapRef.current!.getBoundingClientRect();

      // Show popup immediately with loading state
      setGeoPopup({ lat, lng, screenX: point.x, screenY: point.y, props: {}, loading: true });
      setSelectedIdx(null);
      setSidebarOpen(false);

      // Fetch geocode in background
      const geoFields = fieldsRef.current.filter(f => f.geocode);
      if (geoFields.length > 0 || true) { // always fetch for popup display
        const props = await reverseGeocode(lat, lng);
        setGeoPopup(prev => prev ? { ...prev, props, loading: false } : null);
      } else {
        setGeoPopup(prev => prev ? { ...prev, loading: false } : null);
      }
    });
  }, [L, sessionData, reverseGeocode]);

  // ── Fit bounds ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !L || !pinBounds?.length) return;
    if (pinBounds.length === 1) mapInstance.current.setView(pinBounds[0], 15);
    else mapInstance.current.fitBounds(pinBounds, { padding: [60, 60] });
  }, [L, pinBounds]);

  // ── Markers ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !L) return;
    markersRef.current.forEach(m => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    pins.forEach((pin, idx) => {
      const isSelected = idx === selectedIdx;
      const fill = getPinColor(pin, isSelected);
      const ring = isSelected
        ? "border:3px solid #fff;box-shadow:0 0 0 3px #1976D2,0 2px 8px rgba(0,0,0,0.4);"
        : "border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.5);";

      const icon = L.divIcon({
        html: `<div style="width:18px;height:18px;border-radius:50%;background:${fill};${ring}"></div>`,
        iconSize: [18,18], iconAnchor: [9,9], className: "",
      });

      const marker = L.marker([pin.lat, pin.lng], {
        draggable: !viewOnly && pin.id === null,
        icon,
      }).addTo(mapInstance.current);

      marker.on("click", () => {
        setGeoPopup(null);
        setDraftPin(null);
        setSelectedIdx(idx);
        setSidebarOpen(true);
        // Pan to pin without changing zoom
        mapInstance.current.panTo([pin.lat, pin.lng]);
      });

      marker.on("dragend", (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        setPins(prev => {
          const updated = prev.map((p, i) => i === idx ? { ...p, lat, lng, _updated: true } : p);
          pinsRef.current = updated;
          return updated;
        });
      });

      markersRef.current.push(marker);
    });
  }, [pins, L, selectedIdx, getPinColor, viewOnly]);

  // ── Add pin from popup ────────────────────────────────────────────────────
  const handleAddPin = useCallback(() => {
    if (!geoPopup) return;
    const { lat, lng, props } = geoPopup;

    const newPin: Pin = { id: null, lat, lng };
    fieldsRef.current.forEach(f => {
      // Default value from field config
      newPin[f.key] = f.default ?? "";
      // Auto-fill from geocode if mapped and value exists
      if (f.geocode && props[f.geocode]) newPin[f.key] = props[f.geocode];
    });

    setDraftPin(newPin);
    setGeoPopup(null);
    setSidebarOpen(true);
    setSelectedIdx(null); // draft is not yet in pins array
  }, [geoPopup]);

  // ── Save draft pin to list ────────────────────────────────────────────────
  const saveDraftPin = useCallback(() => {
    if (!draftPin) return;
    setPins(prev => {
      const updated = [...prev, draftPin];
      pinsRef.current = updated;
      setSelectedIdx(updated.length - 1);
      return updated;
    });
    setDraftPin(null);
  }, [draftPin]);

  // ── Discard draft ─────────────────────────────────────────────────────────
  const discardDraft = useCallback(() => {
    setDraftPin(null);
    setSidebarOpen(false);
  }, []);

  // ── Update draft or saved pin ─────────────────────────────────────────────
  const updateDraft = useCallback((updates: Partial<Pin>) => {
    setDraftPin(prev => prev ? { ...prev, ...updates } : prev);
  }, []);

  const updatePin = useCallback((idx: number, updates: Partial<Pin>) => {
    setPins(prev => {
      const updated = prev.map((p, i) => i === idx ? { ...p, ...updates, _updated: true } : p);
      pinsRef.current = updated;
      return updated;
    });
  }, []);

  const deletePin = useCallback((idx: number) => {
    setPins(prev => { const u = prev.filter((_,i) => i !== idx); pinsRef.current = u; return u; });
    setSelectedIdx(null);
    setSidebarOpen(false);
  }, []);

  const flyToPin = (pin: Pin, idx: number) => {
    mapInstance.current?.panTo([pin.lat, pin.lng]); // pan only, no zoom change
    setGeoPopup(null);
    setDraftPin(null);
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
    if (!searchQuery.trim() || !sessionData?.mapboxKey) return;
    try {
      const res  = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${sessionData.mapboxKey}`);
      const json = await res.json();
      if (json.features?.length) {
        const [lng, lat] = json.features[0].center;
        mapInstance.current?.setView([lat, lng], 14);
      }
    } catch {}
  };

  // ── Field renderer ────────────────────────────────────────────────────────
  const renderField = (field: Field, value: any, editable: boolean, onChange: (v: any) => void) => {
    const base: React.CSSProperties = {
      width: "100%", padding: "9px 12px", borderRadius: "6px",
      border: "1px solid #e0e0e0", fontSize: "14px", boxSizing: "border-box",
      outline: "none", fontFamily: "inherit", color: "#1a1a1a",
    };
    if (!editable) return (
      <div style={{ ...base, background: "#f5f5f5", color: "#555", border: "1px solid #eee", minHeight: "38px" }}>
        {value || "—"}
      </div>
    );
    switch (field.type) {
      case "textarea":  return <textarea value={value ?? ""} onChange={e => onChange(e.target.value)} style={{ ...base, height: "80px", resize: "vertical" }} />;
      case "number":    return <input type="number" value={value ?? ""} onChange={e => onChange(Number(e.target.value))} style={base} />;
      case "datetime":  return <input type="datetime-local" value={value ?? ""} onChange={e => onChange(e.target.value)} style={base} />;
      case "dropdown":  return (
        <select value={value ?? ""} onChange={e => onChange(e.target.value)} style={base}>
          <option value="">Select...</option>
          {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      );
      default: return <input type="text" value={value ?? ""} onChange={e => onChange(e.target.value)} style={base} />;
    }
  };

  if (error) return <div style={{ padding: 40, color: "#B00020", fontFamily: "sans-serif" }}>Error: {error}</div>;

  const isDraft   = !!draftPin && sidebarOpen;
  const activePinData = isDraft ? draftPin : selectedPin;
  const isNewActivePinData = isDraft ? true : (selectedPin?.id === null);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden", fontFamily: "system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ height: "52px", background: "#0A1A2F", display: "flex", alignItems: "center", padding: "0 14px", gap: "10px" }}>
        <img src="/TemplatesLogoWhite.png" alt="Logo" style={{ height: "30px" }} />
        {viewOnly && <span style={{ fontSize: "11px", color: "#FFB300", border: "1px solid #FFB300", borderRadius: "4px", padding: "2px 8px", fontWeight: 600 }}>VIEW ONLY</span>}
        {!allowNewPins && !viewOnly && <span style={{ fontSize: "11px", color: "#78909C", border: "1px solid #78909C", borderRadius: "4px", padding: "2px 8px", fontWeight: 600 }}>NO NEW PINS</span>}
        <div style={{ flex: 1 }} />
        <input type="text" placeholder="Search address..." value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          style={{ padding: "5px 10px", borderRadius: "5px", border: "none", fontSize: "13px", width: "200px", background: "#fff", outline: "none" }}
        />
        <button onClick={handleSearch} style={{ padding: "5px 12px", background: "#1976D2", color: "#fff", border: "none", borderRadius: "5px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>Search</button>
        {!viewOnly
          ? <button onClick={saveAndClose} style={{ padding: "5px 12px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "5px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>Save & Close</button>
          : <button onClick={() => window.close()} style={{ padding: "5px 12px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "5px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>Close</button>
        }
      </div>

      {/* ── Map area ── */}
      <div style={{ position: "relative", height: "calc(100vh - 52px)" }}>
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

        {/* Click hint */}
        {allowNewPins && !viewOnly && pins.length === 0 && !loading && (
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", zIndex: 800, background: "rgba(10,26,47,0.8)", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", pointerEvents: "none" }}>
            Click the map to explore a location
          </div>
        )}

        {/* Pin count chip */}
        {pins.length > 0 && (
          <div onClick={() => setPinListOpen(o => !o)} style={{ position: "absolute", top: 12, left: 12, zIndex: 800, background: "#0A1A2F", color: "#fff", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.3)", userSelect: "none" }}>
            📍 Pins ({pins.length})
          </div>
        )}

        {/* Pin list dropdown */}
        {pinListOpen && pins.length > 0 && (
          <div style={{ position: "absolute", top: 48, left: 12, zIndex: 800, background: "#fff", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", width: "260px", maxHeight: "340px", overflowY: "auto", padding: "8px" }}>
            {pins.map((pin, idx) => {
              const cf  = fields.find(f => f.pinColor);
              const cv  = cf ? String(pin[cf.key] || "") : "";
              const dot = STATUS_COLORS[cv] || "#607D8B";
              return (
                <div key={idx} onClick={() => flyToPin(pin, idx)} style={{ padding: "10px 12px", marginBottom: "4px", background: selectedIdx === idx ? "#e3f2fd" : "#fafafa", border: `1px solid ${selectedIdx === idx ? "#90caf9" : "#eee"}`, borderRadius: "7px", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <strong style={{ color: "#0A1A2F" }}>{getPinLabel(pin) || `Pin ${idx + 1}`}</strong>
                    {cv && <span style={{ color: "#666", marginLeft: 6, fontSize: "11px" }}>{cv}</span>}
                    <br /><small style={{ color: "#999" }}>{pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}</small>
                    {pin.id === null && <span style={{ color: "#1976D2", fontSize: "10px", marginLeft: 4 }}>• new</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Geo popup ── */}
        {geoPopup && (() => {
          const { screenX, screenY, props, loading: geoLoading } = geoPopup;
          const mapRect = mapRef.current?.getBoundingClientRect();
          const containerW = mapRect?.width  || 800;
          const containerH = mapRect?.height || 600;
          const popupW = 260;
          const popupH = 200;
          // Keep popup within map bounds
          const left = Math.min(Math.max(screenX - popupW / 2, 8), containerW - popupW - 8);
          const top  = screenY + 16 + popupH > containerH ? screenY - popupH - 16 : screenY + 16;

          const hasName    = !!props.place_name;
          const hasAddress = !!(props.address || props.city);

          return (
            <div style={{ position: "absolute", left, top, zIndex: 850, background: "#fff", borderRadius: "10px", boxShadow: "0 4px 24px rgba(0,0,0,0.22)", width: `${popupW}px`, overflow: "hidden" }}>
              {/* Popup header */}
              <div style={{ background: "#0A1A2F", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#fff", fontWeight: 600, fontSize: "13px" }}>
                  {geoLoading ? "Looking up location…" : (hasName ? props.place_name : "Location")}
                </span>
                <span onClick={() => setGeoPopup(null)} style={{ color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "18px", lineHeight: 1 }}>×</span>
              </div>

              {/* Popup body */}
              <div style={{ padding: "12px 14px" }}>
                {geoLoading ? (
                  <div style={{ color: "#999", fontSize: "13px" }}>Fetching details…</div>
                ) : (
                  <>
                    {props.category && <div style={{ fontSize: "11px", color: "#1976D2", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase" }}>{props.category}</div>}
                    {hasAddress && (
                      <div style={{ fontSize: "12px", color: "#555", marginBottom: "4px" }}>
                        {props.address && <div>{props.address}</div>}
                        {(props.city || props.province || props.postcode) && (
                          <div>{[props.city, props.province, props.postcode].filter(Boolean).join(", ")}</div>
                        )}
                      </div>
                    )}
                    {props.phone   && <div style={{ fontSize: "12px", color: "#555", marginBottom: "2px" }}>📞 {props.phone}</div>}
                    {props.website && <div style={{ fontSize: "12px", color: "#1976D2", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>🌐 {props.website}</div>}
                    {!hasName && !hasAddress && !props.phone && (
                      <div style={{ fontSize: "12px", color: "#999" }}>No details found for this location.</div>
                    )}
                  </>
                )}

                {!geoLoading && allowNewPins && !viewOnly && (
                  <button onClick={handleAddPin} style={{ marginTop: "10px", width: "100%", padding: "9px", background: "#0A1A2F", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
                    + Add Pin Here
                  </button>
                )}

                <div style={{ marginTop: "6px", fontSize: "11px", color: "#bbb", textAlign: "center" }}>
                  {geoPopup.lat.toFixed(5)}, {geoPopup.lng.toFixed(5)}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Sidebar ── */}
        {sidebarOpen && activePinData && (
          <div style={{ position: "absolute", top: 0, right: 0, width: "360px", height: "100%", background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,0.18)", zIndex: 900, display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {(() => {
                  const cf = fields.find(f => f.pinColor);
                  const cv = cf ? String(activePinData[cf.key] || "") : "";
                  return <div style={{ width: 10, height: 10, borderRadius: "50%", background: STATUS_COLORS[cv] || "#607D8B" }} />;
                })()}
                <span style={{ fontWeight: 700, fontSize: "15px", color: "#0A1A2F" }}>
                  {getPinLabel(activePinData) || (isDraft ? "New Pin" : `Pin ${(selectedIdx ?? 0) + 1}`)}
                </span>
                {isDraft && <span style={{ fontSize: "10px", color: "#1976D2", border: "1px solid #1976D2", borderRadius: "4px", padding: "1px 6px", fontWeight: 600 }}>DRAFT</span>}
                {!isDraft && isNewActivePinData && <span style={{ fontSize: "10px", color: "#43A047", border: "1px solid #43A047", borderRadius: "4px", padding: "1px 6px", fontWeight: 600 }}>NEW</span>}
              </div>
              <span onClick={() => { isDraft ? discardDraft() : (setSidebarOpen(false), setSelectedIdx(null)); }} style={{ cursor: "pointer", fontSize: "20px", color: "#999", lineHeight: 1, padding: "2px 6px" }}>×</span>
            </div>

            {/* Fields */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              {fields.filter(f => isFieldVisible(f, isDraft || isNewActivePinData)).map(field => {
                const editable = isFieldEditable(field, isDraft || isNewActivePinData);
                const value    = activePinData[field.key];
                const onChange = isDraft
                  ? (v: any) => updateDraft({ [field.key]: v })
                  : (v: any) => updatePin(selectedIdx!, { [field.key]: v });

                return (
                  <div key={field.key} style={{ marginBottom: "18px" }}>
                    <label style={{ fontWeight: 700, fontSize: "12px", color: "#000", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {field.label}
                      {field.geocode && value && <span style={{ color: "#1976D2", fontSize: "10px", fontWeight: 400, textTransform: "none" }}>auto-filled</span>}
                    </label>
                    {renderField(field, value, editable, onChange)}
                  </div>
                );
              })}

              {/* Location */}
              <div style={{ paddingTop: "16px", borderTop: "1px solid #f0f0f0" }}>
                <span style={{ fontWeight: 700, fontSize: "12px", color: "#000", textTransform: "uppercase", letterSpacing: "0.04em" }}>Location</span>
                <div style={{ marginTop: "6px", fontSize: "13px", color: "#444" }}>
                  <strong>Lat</strong> {activePinData.lat.toFixed(6)} &nbsp; <strong>Lng</strong> {activePinData.lng.toFixed(6)}
                </div>
              </div>

              {/* Draft actions */}
              {isDraft && (
                <div style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
                  <button onClick={saveDraftPin} style={{ flex: 1, padding: "12px", background: "#0A1A2F", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                    Save Pin
                  </button>
                  <button onClick={discardDraft} style={{ padding: "12px 16px", background: "#fff", color: "#B00020", border: "1px solid #B00020", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                    Discard
                  </button>
                </div>
              )}

              {/* Delete saved new pin */}
              {!isDraft && isNewActivePinData && !viewOnly && selectedIdx !== null && (
                <button onClick={() => deletePin(selectedIdx)} style={{ marginTop: "24px", width: "100%", padding: "12px", background: "#B00020", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                  Delete Pin
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.96)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, fontSize: "15px", color: "#0A1A2F", fontWeight: 600 }}>
          Loading session...
        </div>
      )}
    </div>
  );
}

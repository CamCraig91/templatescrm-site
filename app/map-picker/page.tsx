"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type FieldType = "text" | "textarea" | "number" | "datetime" | "dropdown" | "readonly" | "linked";

type Field = {
  key:             string;
  label:           string;
  type:            FieldType;
  options?:        string[];
  default?:        any;
  hidden?:         boolean;
  pinLabel?:       boolean | string;          // true | "FieldA + ' - ' + FieldB"
  pinColor?:       boolean | Record<string,string>; // true | {"Shift Start":"blue",...}
  geocode?:        string;
  showOnNew?:      boolean;
  showOnExisting?: boolean;
  editOnNew?:      boolean;
  editOnExisting?: boolean;
};

type Pin = {
  id:      string | number | null;
  lat:     number;
  lng:     number;
  _isNew?: boolean;
  [key: string]: any;
};

type GeoPopup = {
  lat:     number;
  lng:     number;
  screenX: number;
  screenY: number;
  props:   Record<string,string>;
  loading: boolean;
};

const DEFAULT_COLORS: Record<string,string> = {
  blue: "#1976D2", green: "#43A047", red: "#E53935",
  yellow: "#FFB300", orange: "#F57C00", grey: "#78909C", gray: "#78909C",
  purple: "#7B1FA2", teal: "#00897B", pink: "#E91E63",
};

function resolveColor(raw: string): string {
  return DEFAULT_COLORS[raw.toLowerCase()] || raw;
}

const FALLBACK_COLORS: Record<string,string> = {
  "Completed":"#43A047","Approved":"#43A047","Accepted":"#43A047","Done":"#43A047",
  "In Progress":"#1976D2","Active":"#1976D2","Started":"#1976D2","Shift Start":"#1976D2",
  "Pending":"#FFB300","Not Started":"#FFB300","Scheduled":"#FFB300",
  "Cancelled":"#E53935","Closed":"#E53935","Rejected":"#E53935","Failed":"#E53935",
  "Shift End":"#43A047","Break Start":"#FFB300","Break End":"#FFB300","On Hold":"#78909C",
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
  const [draftPin,    setDraftPin]    = useState<Pin | null>(null);
  const [geoPopup,    setGeoPopup]    = useState<GeoPopup | null>(null);
  const [pinBounds,   setPinBounds]   = useState<[number,number][] | null>(null);
  const [pinListOpen, setPinListOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [userPos,     setUserPos]     = useState<[number,number] | null>(null);
  const [isMobile,    setIsMobile]    = useState(false);

  const [sessionId] = useState(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("session") : null
  );

  useEffect(() => { pinsRef.current    = pins;        }, [pins]);
  useEffect(() => { fieldsRef.current  = fields;      }, [fields]);
  useEffect(() => { sessionRef.current = sessionData; }, [sessionData]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDraft          = !!draftPin && sidebarOpen;
  const activePinData    = isDraft ? draftPin : (selectedIdx !== null ? pins[selectedIdx] ?? null : null);
  const isNewActivePinData = isDraft ? true : !!activePinData?._isNew;

  const allowNewPins = sessionData?.allowNewPins !== false;
  const viewOnly     = sessionData?.viewOnly === true;

  // ── Pin label ─────────────────────────────────────────────────────────────
  const getPinLabel = useCallback((pin: Pin): string => {
    const f = fieldsRef.current.find(f => f.pinLabel);
    if (!f) {
      for (const k of ["Name","name","Title","title"]) if (pin[k]) return String(pin[k]);
      return "";
    }
    if (typeof f.pinLabel === "string") {
      // Expression like "FieldA + ' - ' + FieldB"
      try {
        const expr = f.pinLabel.replace(/(\w+)/g, (m) => {
          if (m === "undefined" || m === "null") return `""`;
          return pin[m] !== undefined ? JSON.stringify(String(pin[m])) : `""`;
        });
        // eslint-disable-next-line no-eval
        return eval(expr) || "";
      } catch { return String(pin[f.key] || ""); }
    }
    return String(pin[f.key] || "");
  }, []);

  // ── Pin colour ────────────────────────────────────────────────────────────
  const getPinColor = useCallback((pin: Pin, isSelected: boolean): string => {
    if (isSelected) return "#1976D2";
    const f = fieldsRef.current.find(f => f.pinColor);
    if (!f) return "#607D8B";
    const val = String(pin[f.key] || "");
    if (typeof f.pinColor === "object") {
      const raw = f.pinColor[val] || f.pinColor[""] || "#607D8B";
      return resolveColor(raw);
    }
    return FALLBACK_COLORS[val] || "#607D8B";
  }, []);

  // ── Field helpers ─────────────────────────────────────────────────────────
  const isFieldVisible = (f: Field, isNew: boolean) => {
    if (f.hidden) return false;
    // Don't show the raw id/lat/lng fields — handled separately
    if (["id","lat","lng","Latitude","Longitude"].includes(f.key) && f.key === "id") return isNew ? false : (f.showOnExisting !== false);
    return isNew ? f.showOnNew !== false : f.showOnExisting !== false;
  };

  const isFieldEditable = (f: Field, isNew: boolean) => {
    if (viewOnly) return false;
    if (f.type === "readonly" || f.type === "linked") return false;
    return isNew ? f.editOnNew !== false : f.editOnExisting !== false;
  };

  // ── Geocode ───────────────────────────────────────────────────────────────
  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<Record<string,string>> => {
    const key = sessionRef.current?.mapboxKey;
    if (!key) return {};
    try {
      // Request both POI and address types
      const res  = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json` +
        `?types=poi,address,place,postcode&limit=3&access_token=${key}`
      );
      const json = await res.json();
      const features = json.features || [];
      if (!features.length) return {};

      const props: Record<string,string> = {};

      // Find POI feature first, fall back to address
      const poi  = features.find((f: any) => f.place_type?.includes("poi"));
      const addr = features.find((f: any) => f.place_type?.includes("address")) || features[0];
      const main = poi || addr;

      // Business name — only from POI
      if (poi) {
        props.place_name = poi.text || "";
        props.category   = poi.properties?.category || poi.place_type?.[0] || "";
        props.phone      = poi.properties?.tel      || "";
        props.website    = poi.properties?.website  || "";
      }

      // Address from address feature
      if (addr) {
        const addrText = addr.properties?.address || addr.place_name?.split(",")[0] || "";
        props.address      = addrText;
        props.full_address = addr.place_name || "";
      }

      // Context for city/province/postcode
      const contextSrc = main || addr;
      (contextSrc?.context || []).forEach((ctx: any) => {
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
      const l = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      await import("leaflet-defaulticon-compatibility");
      await import("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css");
      setL(l);
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
          id:     p.id  ?? null,
          lat:    parseFloat(p.lat  ?? p.Latitude)  || 0,
          lng:    parseFloat(p.lng  ?? p.Longitude) || 0,
          _isNew: false,
        }));
        setSessionData(json);
        setFields(loadedFields);
        fieldsRef.current  = loadedFields;
        setPins(loadedPins);
        pinsRef.current    = loadedPins;
        if (loadedPins.length) setPinBounds(loadedPins.map(p => [p.lat, p.lng]));
      } catch (err: any) { setError(err.message); }
      finally { setLoading(false); }
    })();
  }, [sessionId]);

  // ── User location ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) return;
    const startWatch = () => {
      const id = navigator.geolocation.watchPosition(
        pos => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        ()  => {},
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
      return () => navigator.geolocation.clearWatch(id);
    };
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then(r => {
        if (r.state !== "denied") startWatch();
      }).catch(startWatch);
    } else { startWatch(); }
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !L || !userPos) return;
    if (userMarker.current) mapInstance.current.removeLayer(userMarker.current);
    const icon = L.divIcon({
      html: `<div style="position:relative;width:22px;height:22px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:rgba(25,118,210,0.25);animation:geopulse 2s infinite ease-out;"></div>
        <div style="position:absolute;top:4px;left:4px;width:14px;height:14px;border-radius:50%;background:#1976D2;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(25,118,210,0.5);"></div>
      </div>
      <style>@keyframes geopulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.5);opacity:0}}</style>`,
      iconSize: [22,22], iconAnchor: [11,11], className: "",
    });
    userMarker.current = L.marker(userPos, { icon, zIndexOffset: 2000, interactive: false })
      .addTo(mapInstance.current);
  }, [L, userPos]);

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
      const pt = mapInstance.current.latLngToContainerPoint([lat, lng]);
      setGeoPopup({ lat, lng, screenX: pt.x, screenY: pt.y, props: {}, loading: true });
      setSelectedIdx(null);
      setSidebarOpen(false);
      setDraftPin(null);
      const props = await reverseGeocode(lat, lng);
      setGeoPopup(prev => prev ? { ...prev, props, loading: false } : null);
    });
  }, [L, sessionData, reverseGeocode]);

  // ── Fit bounds ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !L || !pinBounds?.length) return;
    if (pinBounds.length === 1) mapInstance.current.setView(pinBounds[0], 15);
    else mapInstance.current.fitBounds(pinBounds, { padding: [60,60] });
  }, [L, pinBounds]);

  // ── Markers ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !L) return;
    markersRef.current.forEach(m => mapInstance.current.removeLayer(m));
    markersRef.current = [];
    pins.forEach((pin, idx) => {
      const isSel  = idx === selectedIdx;
      const fill   = getPinColor(pin, isSel);
      const ring   = isSel
        ? "border:3px solid #fff;box-shadow:0 0 0 3px #1976D2,0 2px 8px rgba(0,0,0,0.4);"
        : "border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.5);";
      const icon   = L.divIcon({
        html: `<div style="width:18px;height:18px;border-radius:50%;background:${fill};${ring}"></div>`,
        iconSize:[18,18], iconAnchor:[9,9], className:"",
      });
      const marker = L.marker([pin.lat, pin.lng], { draggable: !viewOnly && !!pin._isNew, icon })
        .addTo(mapInstance.current);
      marker.on("click", () => {
        setGeoPopup(null);
        setDraftPin(null);
        setSelectedIdx(idx);
        setSidebarOpen(true);
        mapInstance.current.panTo([pin.lat, pin.lng]);
      });
      marker.on("dragend", (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        setPins(prev => {
          const u = prev.map((p,i) => i===idx ? {...p,lat,lng,_updated:true} : p);
          pinsRef.current = u; return u;
        });
      });
      markersRef.current.push(marker);
    });
  }, [pins, L, selectedIdx, getPinColor, viewOnly]);

  // ── Draft actions ─────────────────────────────────────────────────────────
  const handleAddPin = useCallback(() => {
    if (!geoPopup) return;
    const { lat, lng, props } = geoPopup;
    const newPin: Pin = { id: null, lat, lng, _isNew: true };
    fieldsRef.current.forEach(f => {
      newPin[f.key] = f.default ?? "";
      if (f.geocode && props[f.geocode]) newPin[f.key] = props[f.geocode];
    });
    setDraftPin(newPin);
    setGeoPopup(null);
    setSidebarOpen(true);
    setSelectedIdx(null);
  }, [geoPopup]);

  const saveDraftPin = useCallback(() => {
    if (!draftPin) return;
    setPins(prev => {
      const u = [...prev, draftPin];
      pinsRef.current = u;
      setTimeout(() => { setSelectedIdx(u.length - 1); }, 0);
      return u;
    });
    setDraftPin(null);
  }, [draftPin]);

  const discardDraft = useCallback(() => { setDraftPin(null); setSidebarOpen(false); }, []);

  const updateDraft = useCallback((updates: Partial<Pin>) => {
    setDraftPin(prev => prev ? { ...prev, ...updates } : prev);
  }, []);

  const updatePin = useCallback((idx: number, updates: Partial<Pin>) => {
    setPins(prev => {
      const u = prev.map((p,i) => i===idx ? {...p,...updates,_updated:true} : p);
      pinsRef.current = u; return u;
    });
  }, []);

  const deletePin = useCallback((idx: number) => {
    setPins(prev => { const u = prev.filter((_,i)=>i!==idx); pinsRef.current=u; return u; });
    setSelectedIdx(null); setSidebarOpen(false);
  }, []);

  const flyToPin = (pin: Pin, idx: number) => {
    mapInstance.current?.panTo([pin.lat, pin.lng]);
    setGeoPopup(null); setDraftPin(null);
    setSelectedIdx(idx); setSidebarOpen(true); setPinListOpen(false);
  };

  const saveAndClose = async () => {
    if (!sessionId) return;
    await fetch(`/api/map-picker/session/${sessionId}/result`, {
      method: "POST", headers: { "Content-Type": "application/json" },
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
        const [lng,lat] = json.features[0].center;
        mapInstance.current?.setView([lat,lng], 14);
      }
    } catch {}
  };

  // ── Field renderer ────────────────────────────────────────────────────────
  const renderField = (field: Field, value: any, editable: boolean, onChange: (v:any)=>void) => {
    const base: React.CSSProperties = {
      width:"100%", padding:"9px 12px", borderRadius:"6px", border:"1px solid #e0e0e0",
      fontSize:"14px", boxSizing:"border-box", outline:"none", fontFamily:"inherit", color:"#1a1a1a",
    };
    if (!editable) return (
      <div style={{...base, background:"#f5f5f5", color:"#555", border:"1px solid #eee", minHeight:"38px"}}>
        {value || "—"}
      </div>
    );
    switch (field.type) {
      case "textarea": return <textarea value={value??""} onChange={e=>onChange(e.target.value)} style={{...base,height:"80px",resize:"vertical"}} />;
      case "number":   return <input type="number" value={value??""} onChange={e=>onChange(Number(e.target.value))} style={base} />;
      case "datetime": return <input type="datetime-local" value={value??""} onChange={e=>onChange(e.target.value)} style={base} />;
      case "dropdown": return (
        <select value={value??""} onChange={e=>onChange(e.target.value)} style={base}>
          <option value="">Select...</option>
          {field.options?.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      );
      default: return <input type="text" value={value??""} onChange={e=>onChange(e.target.value)} style={base} />;
    }
  };

  if (error) return <div style={{padding:40,color:"#B00020",fontFamily:"sans-serif"}}>Error: {error}</div>;

  const closeSidebar = () => {
    if (isDraft) discardDraft();
    else { setSidebarOpen(false); setSelectedIdx(null); }
  };

  // ── Sidebar content (shared mobile/desktop) ───────────────────────────────
  const SidebarContent = activePinData ? (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      {/* Sidebar header */}
      <div style={{padding:"16px 20px",borderBottom:"1px solid #f0f0f0",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {(() => {
            const cf = fields.find(f=>f.pinColor);
            const cv = cf ? String(activePinData[cf.key]||"") : "";
            const color = cf && typeof cf.pinColor==="object" ? resolveColor(cf.pinColor[cv]||cf.pinColor[""]||"#607D8B") : (FALLBACK_COLORS[cv]||"#607D8B");
            return <div style={{width:10,height:10,borderRadius:"50%",background:color,flexShrink:0}} />;
          })()}
          <span style={{fontWeight:700,fontSize:"15px",color:"#0A1A2F"}}>
            {getPinLabel(activePinData) || (isDraft ? "New Pin" : `Pin ${(selectedIdx??0)+1}`)}
          </span>
          {isDraft && <span style={{fontSize:"10px",color:"#1976D2",border:"1px solid #1976D2",borderRadius:"4px",padding:"1px 6px",fontWeight:600}}>DRAFT</span>}
          {!isDraft && isNewActivePinData && <span style={{fontSize:"10px",color:"#43A047",border:"1px solid #43A047",borderRadius:"4px",padding:"1px 6px",fontWeight:600}}>NEW</span>}
        </div>
        <span onClick={closeSidebar} style={{cursor:"pointer",fontSize:"22px",color:"#999",lineHeight:1,padding:"2px 6px"}}>×</span>
      </div>

      {/* Fields */}
      <div style={{flex:1,overflowY:"auto",padding:"20px"}}>
        {fields.filter(f=>isFieldVisible(f,isDraft||isNewActivePinData)).map(field=>{
          const editable = isFieldEditable(field,isDraft||isNewActivePinData);
          const value    = activePinData[field.key];
          const onChange = isDraft
            ? (v:any)=>updateDraft({[field.key]:v})
            : (v:any)=>updatePin(selectedIdx!,{[field.key]:v});
          return (
            <div key={field.key} style={{marginBottom:"18px"}}>
              <label style={{fontWeight:700,fontSize:"12px",color:"#000",display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.04em"}}>
                {field.label}
                {field.geocode&&value&&<span style={{color:"#1976D2",fontSize:"10px",fontWeight:400,textTransform:"none"}}>auto-filled</span>}
              </label>
              {renderField(field,value,editable,onChange)}
            </div>
          );
        })}

        <div style={{paddingTop:"16px",borderTop:"1px solid #f0f0f0"}}>
          <span style={{fontWeight:700,fontSize:"12px",color:"#000",textTransform:"uppercase",letterSpacing:"0.04em"}}>Location</span>
          <div style={{marginTop:"6px",fontSize:"13px",color:"#444"}}>
            <strong>Lat</strong> {activePinData.lat.toFixed(6)} &nbsp; <strong>Lng</strong> {activePinData.lng.toFixed(6)}
          </div>
        </div>

        {isDraft && (
          <div style={{marginTop:"24px",display:"flex",gap:"10px"}}>
            <button onClick={saveDraftPin} style={{flex:1,padding:"12px",background:"#0A1A2F",color:"#fff",border:"none",borderRadius:"8px",fontWeight:700,fontSize:"14px",cursor:"pointer"}}>Save Pin</button>
            <button onClick={discardDraft} style={{padding:"12px 16px",background:"#fff",color:"#B00020",border:"1px solid #B00020",borderRadius:"8px",fontWeight:600,fontSize:"14px",cursor:"pointer"}}>Discard</button>
          </div>
        )}

        {/* Delete — only for _isNew pins (created this session), never Method records */}
        {!isDraft && activePinData._isNew && !viewOnly && selectedIdx!==null && (
          <button onClick={()=>deletePin(selectedIdx)} style={{marginTop:"24px",width:"100%",padding:"12px",background:"#B00020",color:"#fff",border:"none",borderRadius:"8px",fontWeight:700,fontSize:"14px",cursor:"pointer"}}>
            Delete Pin
          </button>
        )}
      </div>
    </div>
  ) : null;

  return (
    <div style={{width:"100%",height:"100vh",position:"relative",overflow:"hidden",fontFamily:"system-ui,sans-serif"}}>

      {/* ── Header ── */}
      <div style={{height:"52px",background:"#0A1A2F",display:"flex",alignItems:"center",padding:"0 14px",gap:"8px",flexShrink:0}}>
        <img src="/TemplatesLogoWhite.png" alt="Logo" style={{height:"30px",flexShrink:0}} />
        {viewOnly    && <span style={{fontSize:"11px",color:"#FFB300",border:"1px solid #FFB300",borderRadius:"4px",padding:"2px 6px",fontWeight:600,whiteSpace:"nowrap"}}>VIEW ONLY</span>}
        {!allowNewPins&&!viewOnly&&<span style={{fontSize:"11px",color:"#78909C",border:"1px solid #78909C",borderRadius:"4px",padding:"2px 6px",fontWeight:600,whiteSpace:"nowrap"}}>READ ONLY</span>}
        <div style={{flex:1}}/>
        {/* Collapse search on very small screens */}
        {!isMobile && (
          <input type="text" placeholder="Search address..." value={searchQuery}
            onChange={e=>setSearchQuery(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleSearch()}
            style={{padding:"5px 10px",borderRadius:"5px",border:"none",fontSize:"13px",width:"180px",background:"#fff",outline:"none"}}
          />
        )}
        <button onClick={handleSearch} style={{padding:"5px 10px",background:"#1976D2",color:"#fff",border:"none",borderRadius:"5px",fontSize:"12px",cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>
          {isMobile ? "🔍" : "Search"}
        </button>
        {!viewOnly
          ? <button onClick={saveAndClose} style={{padding:"5px 10px",background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.5)",borderRadius:"5px",fontSize:"12px",cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>
              {isMobile ? "💾" : "Save & Close"}
            </button>
          : <button onClick={()=>window.close()} style={{padding:"5px 10px",background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.5)",borderRadius:"5px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>
              {isMobile ? "✕" : "Close"}
            </button>
        }
      </div>

      {/* Mobile search bar below header */}
      {isMobile && (
        <div style={{background:"#0A1A2F",padding:"0 14px 10px",display:"flex",gap:"8px"}}>
          <input type="text" placeholder="Search address..." value={searchQuery}
            onChange={e=>setSearchQuery(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleSearch()}
            style={{flex:1,padding:"7px 10px",borderRadius:"5px",border:"none",fontSize:"13px",background:"#fff",outline:"none"}}
          />
        </div>
      )}

      {/* ── Map area ── */}
      <div style={{position:"relative",height:isMobile?`calc(100vh - ${sidebarOpen?"35vh":0}px - ${isMobile?92:52}px)`:"calc(100vh - 52px)",transition:"height 0.3s"}}>
        <div ref={mapRef} style={{width:"100%",height:"100%"}} />

        {/* Hint */}
        {allowNewPins&&!viewOnly&&pins.length===0&&!loading&&(
          <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",zIndex:800,background:"rgba(10,26,47,0.8)",color:"#fff",padding:"6px 16px",borderRadius:"20px",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}}>
            Click the map to explore a location
          </div>
        )}

        {/* Pin chip */}
        {pins.length>0&&(
          <div onClick={()=>setPinListOpen(o=>!o)} style={{position:"absolute",top:12,left:12,zIndex:800,background:"#0A1A2F",color:"#fff",padding:"6px 14px",borderRadius:"20px",fontSize:"13px",fontWeight:600,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.3)",userSelect:"none"}}>
            📍 Pins ({pins.length})
          </div>
        )}

        {/* Pin list */}
        {pinListOpen&&pins.length>0&&(
          <div style={{position:"absolute",top:48,left:12,zIndex:800,background:"#fff",borderRadius:"10px",boxShadow:"0 4px 20px rgba(0,0,0,0.2)",width:"260px",maxHeight:"320px",overflowY:"auto",padding:"8px"}}>
            {pins.map((pin,idx)=>{
              const cf=fields.find(f=>f.pinColor);
              const cv=cf?String(pin[cf.key]||""):"";
              const dot=cf&&typeof cf.pinColor==="object"?resolveColor((cf.pinColor as any)[cv]||(cf.pinColor as any)[""]||"#607D8B"):(FALLBACK_COLORS[cv]||"#607D8B");
              return (
                <div key={idx} onClick={()=>flyToPin(pin,idx)} style={{padding:"10px 12px",marginBottom:"4px",background:selectedIdx===idx?"#e3f2fd":"#fafafa",border:`1px solid ${selectedIdx===idx?"#90caf9":"#eee"}`,borderRadius:"7px",cursor:"pointer",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px"}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:dot,flexShrink:0}}/>
                  <div style={{minWidth:0}}>
                    <strong style={{color:"#0A1A2F"}}>{getPinLabel(pin)||`Pin ${idx+1}`}</strong>
                    {cv&&<span style={{color:"#666",marginLeft:6,fontSize:"11px"}}>{cv}</span>}
                    <br/><small style={{color:"#999"}}>{pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}</small>
                    {pin._isNew&&<span style={{color:"#1976D2",fontSize:"10px",marginLeft:4}}>• new</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Geo popup ── */}
        {geoPopup&&(()=>{
          const {screenX,screenY,props,loading:gl}=geoPopup;
          const cw=mapRef.current?.clientWidth||800;
          const ch=mapRef.current?.clientHeight||600;
          const pw=Math.min(isMobile?cw-24:280,cw-24);
          const ph=220;
          const left=Math.min(Math.max(screenX-pw/2,8),cw-pw-8);
          const above=screenY+ph+32>ch;
          const top=above?screenY-ph-16:screenY+16;
          const hasName=!!props.place_name;
          const hasAddr=!!(props.address||props.city);
          return (
            <div style={{position:"absolute",left,top,zIndex:850,background:"#fff",borderRadius:"10px",boxShadow:"0 4px 24px rgba(0,0,0,0.22)",width:`${pw}px`,overflow:"hidden"}}>
              {/* pointer triangle */}
              <div style={{position:"absolute",left:screenX-left-8,bottom:above?"auto":-8,top:above?-8:"auto",width:0,height:0,
                borderLeft:"8px solid transparent",borderRight:"8px solid transparent",
              }}/>
              <div style={{background:"#0A1A2F",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:"#fff",fontWeight:600,fontSize:"13px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>
                  {gl?"Looking up…":hasName?props.place_name:hasAddr?props.address:"Location"}
                </span>
                <span onClick={()=>setGeoPopup(null)} style={{color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:"18px",lineHeight:1,marginLeft:8,flexShrink:0}}>×</span>
              </div>
              <div style={{padding:"12px 14px"}}>
                {gl?(
                  <div style={{color:"#999",fontSize:"13px"}}>Fetching details…</div>
                ):(
                  <>
                    {props.category&&<div style={{fontSize:"11px",color:"#1976D2",fontWeight:600,marginBottom:"6px",textTransform:"uppercase"}}>{props.category}</div>}
                    {hasAddr&&(
                      <div style={{fontSize:"12px",color:"#555",marginBottom:"6px",lineHeight:1.5}}>
                        {props.address&&<div>{props.address}</div>}
                        {(props.city||props.province||props.postcode)&&<div>{[props.city,props.province,props.postcode].filter(Boolean).join(", ")}</div>}
                        {props.country&&<div style={{color:"#999"}}>{props.country}</div>}
                      </div>
                    )}
                    {props.phone&&<div style={{fontSize:"12px",color:"#555",marginBottom:"3px"}}>📞 {props.phone}</div>}
                    {props.website&&<div style={{fontSize:"12px",color:"#1976D2",marginBottom:"3px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>🌐 {props.website}</div>}
                    {!hasName&&!hasAddr&&!props.phone&&<div style={{fontSize:"12px",color:"#999"}}>No details found.</div>}
                  </>
                )}
                {!gl&&allowNewPins&&!viewOnly&&(
                  <button onClick={handleAddPin} style={{marginTop:"10px",width:"100%",padding:"9px",background:"#0A1A2F",color:"#fff",border:"none",borderRadius:"6px",fontWeight:700,fontSize:"13px",cursor:"pointer"}}>
                    + Add Pin Here
                  </button>
                )}
                <div style={{marginTop:"6px",fontSize:"11px",color:"#bbb",textAlign:"center"}}>
                  {geoPopup.lat.toFixed(5)}, {geoPopup.lng.toFixed(5)}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Desktop sidebar ── */}
        {!isMobile&&sidebarOpen&&activePinData&&(
          <div style={{position:"absolute",top:0,right:0,width:"360px",height:"100%",background:"#fff",boxShadow:"-4px 0 24px rgba(0,0,0,0.18)",zIndex:900,overflow:"hidden"}}>
            {SidebarContent}
          </div>
        )}
      </div>

      {/* ── Mobile bottom sheet ── */}
      {isMobile&&sidebarOpen&&activePinData&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,height:"55vh",background:"#fff",boxShadow:"0 -4px 24px rgba(0,0,0,0.18)",zIndex:900,borderRadius:"16px 16px 0 0",overflow:"hidden"}}>
          {/* drag handle */}
          <div style={{display:"flex",justifyContent:"center",paddingTop:"8px",paddingBottom:"4px",cursor:"pointer"}} onClick={closeSidebar}>
            <div style={{width:"40px",height:"4px",borderRadius:"2px",background:"#ddd"}}/>
          </div>
          {SidebarContent}
        </div>
      )}

      {loading&&(
        <div style={{position:"absolute",inset:0,background:"rgba(255,255,255,0.96)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,fontSize:"15px",color:"#0A1A2F",fontWeight:600}}>
          Loading session...
        </div>
      )}
    </div>
  );
}

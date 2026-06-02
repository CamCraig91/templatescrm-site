"use client";

import { useEffect, useState } from "react";

export default function LocationPage() {
  const [status, setStatus] = useState("Please wait while we update your record.");
  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Support both uppercase and lowercase
    const recordId =
      params.get("RecordID") ||
      params.get("recordId") ||
      params.get("recordid");

    const authCode =
      params.get("AuthCode") ||
      params.get("authCode") ||
      params.get("authcode");

    const table =
      params.get("TableName") ||
      params.get("tableName") ||
      params.get("tablename");

    const latitudeField =
      params.get("LatitudeFieldName") ||
      params.get("latitudeFieldName") ||
      params.get("latitudefieldname");

    const longitudeField =
      params.get("LongitudeFieldName") ||
      params.get("longitudeFieldName") ||
      params.get("longitudefieldname");

    if (!recordId || !authCode || !table || !latitudeField || !longitudeField) {
      setStatus("Error: Missing required parameters.");
      return;
    }

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);

        setLat(latitude);
        setLng(longitude);

        const proxyPayload = {
          recordId,
          authCode,
          table,
          latitudeField,
          longitudeField,
          latitudeValue: latitude,
          longitudeValue: longitude,
        };

        setPayload(proxyPayload);

        try {
          const response = await fetch("https://your-render-proxy-url-here", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(proxyPayload),
          });

          if (response.ok) {
            setStatus("Record updated successfully.");
            setTimeout(() => window.close(), 1500);
          } else {
            const error = await response.json().catch(() => null);
            setStatus("Error updating record.");
            console.error("Proxy error:", error);
          }
        } catch (err) {
          console.error("Network error:", err);
          setStatus("Error communicating with server.");
        }
      },
      (error) => {
        setStatus("Error obtaining location: " + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", background: "#fff", position: "relative" }}>
      <img
        src="/googlemaps.png"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.55)",
        }}
      />

      <div style={{ position: "relative", zIndex: 3, padding: "2rem", textAlign: "center", color: "white" }}>
        <h1>Acquiring Your Location...</h1>
        <p>{status}</p>

        {lat && lng && (
          <pre>{`Latitude: ${lat}\nLongitude: ${lng}`}</pre>
        )}

        {payload && (
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function LocationPage() {
  const [status, setStatus] = useState("Please wait while we update your record.");
  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const recordId = params.get("RecordID");
  const authCode = params.get("AuthCode");
  const tableName = params.get("TableName");
  const latField = params.get("LatitudeFieldName");
  const lngField = params.get("LongitudeFieldName");

  if (!recordId || !authCode || !tableName || !latField || !lngField) {
    setStatus("Error: Missing required parameters.");
    return;
  }

  if (!navigator.geolocation) {
    setStatus("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude.toFixed(6);
      const longitude = position.coords.longitude.toFixed(6);

      setLat(latitude);
      setLng(longitude);

      const updateEndpoint = `https://rest.method.me/api/v1/tables/${tableName}/${recordId}`;

      const payloadData = {
        data: {
          [latField]: latitude.toString(),
          [lngField]: longitude.toString(),
        },
      };

      setPayload(payloadData);

      fetch(updateEndpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `APIKey ${authCode}`,
        },
        body: JSON.stringify(payloadData),
      })
        .then((response) => {
          if (response.status === 204) {
            window.close();
          } else {
            setStatus("Error updating record.");
          }
        })
        .catch(() => {
          setStatus("Error updating record.");
        });
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
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Background Map */}
      <img
        src="/googlemaps.png"
        alt="Map Background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.55)",
          zIndex: 1,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: "70px",
          background: "#0A1A2F",
          display: "flex",
          alignItems: "center",
          paddingLeft: "24px",
        }}
      >
        <img
          src="/TemplatesLogoWhite.png"
          alt="Templates CRM Logo"
          style={{ height: "38px", pointerEvents: "none", userSelect: "none" }}
        />
      </div>

      {/* Centered Text */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "2.4rem", fontWeight: 700, marginBottom: "1rem" }}>
          Acquiring Your Location...
        </h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          {status}
        </p>

        {lat && lng && (
          <div style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
            <strong>Your Location:</strong><br />
            {lat}, {lng}
          </div>
        )}

        {payload && (
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>
            <strong>Payload Sent:</strong>
            <div>{JSON.stringify(payload)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

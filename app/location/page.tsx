"use client";

import { useEffect, useState } from "react";

export default function LocationPage() {
  const [status, setStatus] = useState("Please wait while we update your record.");
  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>(null);

  const params = new URLSearchParams(window.location.search);

const recordId =
  params.get("RecordID") ||
  params.get("recordId") ||
  params.get("recordid");

const authCode =
  params.get("AuthCode") ||
  params.get("authCode") ||
  params.get("authcode");

const tableName =
  params.get("TableName") ||
  params.get("tableName") ||
  params.get("tablename");

const latField =
  params.get("LatitudeFieldName") ||
  params.get("latitudeFieldName") ||
  params.get("latitudefieldname");

const lngField =
  params.get("LongitudeFieldName") ||
  params.get("longitudeFieldName") ||
  params.get("longitudefieldname");

if (!recordId || !authCode || !tableName || !latField || !lngField) {
  setStatus("Error: Missing required parameters.");
  return;
}



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

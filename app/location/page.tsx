"use client";

import { useEffect, useState } from "react";

export default function LocationPage() {
  const [status, setStatus] = useState("Acquiring your location...");
  const [stage, setStage] = useState<"locating" | "updating" | "success" | "error">("locating");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

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
      setStage("error");
      return;
    }

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser.");
      setStage("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);

        setStage("updating");
        setStatus("Updating record...");

        const proxyPayload = {
          recordId,
          authCode,
          table,
          latitudeField,
          longitudeField,
          latitudeValue: latitude,
          longitudeValue: longitude,
        };

        try {
          const response = await fetch("https://location-api-mkpl.onrender.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(proxyPayload),
          });

          if (response.ok) {
            setStage("success");
            setStatus("Success!");
            setTimeout(() => window.close(), 1500);
          } else {
            setStage("error");
            setStatus("Error updating record.");
          }
        } catch (err) {
          setStage("error");
          setStatus("Error communicating with server.");
        }
      },
      (error) => {
        setStage("error");
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

      {/* Centered Content */}
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
        {/* Spinner */}
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "5px solid rgba(255,255,255,0.3)",
            borderTop: "5px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "1.5rem",
          }}
        />

        <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "1rem" }}>
          {status}
        </h1>
      </div>

      {/* Spinner Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

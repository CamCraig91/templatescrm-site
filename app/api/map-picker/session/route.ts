import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sessions } from "../sessions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = randomUUID();

    const rawPins = body.pins || [];
    const fields: any[] = body.fields || [];

    const normalizedPins = rawPins.map((pin: any) => {
      const lat = parseFloat(pin.Latitude ?? pin.lat) || 0;
      const lng = parseFloat(pin.Longitude ?? pin.lng) || 0;
      const id = pin.id ?? pin.RecordID ?? null;

      // Start with all original pin data (preserves full API field keys if present)
      const normalized: any = { ...pin, id, lat, lng };

      // For each configured field, if the pin doesn't have the full key but has
      // a matching short key (label or last segment of key), copy it over.
      fields.forEach((f: any) => {
        if (normalized[f.key] !== undefined) return; // already have it

        // Try the label as a key (e.g. field label "Name" → pin["Name"])
        if (pin[f.label] !== undefined) {
          normalized[f.key] = pin[f.label];
          return;
        }

        // Try the last segment of the key (e.g. "CustomScheduleRecordIDContactRecordIDName" → "Name")
        const shortKey = f.key.split(/(?=[A-Z])/).pop();
        if (shortKey && pin[shortKey] !== undefined) {
          normalized[f.key] = pin[shortKey];
        }
      });

      return normalized;
    });

    await sessions.set(sessionId, {
      ...body,
      createdAt: Date.now(),
      pins: normalizedPins,
    });

    console.log(`✅ Session ${sessionId}: ${normalizedPins.length} pins, keys sample:`,
      normalizedPins[0] ? Object.keys(normalizedPins[0]) : []);
    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
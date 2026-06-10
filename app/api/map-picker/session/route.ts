import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sessions } from "../sessions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = randomUUID();

    // Normalize pins if provided upfront (send config + pins together in one call)
    const rawPins = body.pins || [];
    const normalizedPins = rawPins.map((pin: any) => ({
      id: pin.id ?? pin.RecordID ?? null,
      lat: parseFloat(pin.Latitude ?? pin.lat) || 0,
      lng: parseFloat(pin.Longitude ?? pin.lng) || 0,
      ...pin,
    }));

    await sessions.set(sessionId, {
      ...body,
      createdAt: Date.now(),
      pins: normalizedPins,
    });

    console.log(`✅ New session created: ${sessionId} with ${normalizedPins.length} pins`);
    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
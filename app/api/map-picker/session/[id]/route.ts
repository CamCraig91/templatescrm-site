import { NextRequest, NextResponse } from "next/server";
import { sessions } from "../route";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = sessions.get(id);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("Session fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Populate existing pins - with normalization
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    let session = sessions.get(id);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const { pins: rawPins } = await req.json();

    // Normalize pins for the map
    const normalizedPins = (rawPins || []).map((pin: any) => ({
      id: pin.id || null,
      lat: parseFloat(pin[session.latField] || pin.Latitude || pin.lat) || 0,
      lng: parseFloat(pin[session.lngField] || pin.Longitude || pin.lng) || 0,
      // Copy all other fields
      ...pin,
      // Ensure status and other important fields are present
      [session.statusField || "Status"]: pin[session.statusField] || pin.Status,
    }));

    sessions.set(id, {
      ...session,
      pins: normalizedPins,
    });

    console.log(`✅ Session ${id} populated with ${normalizedPins.length} normalized pins`);

    return NextResponse.json({ 
      success: true, 
      pinCount: normalizedPins.length 
    });
  } catch (error) {
    console.error("Populate pins error:", error);
    return NextResponse.json({ error: "Failed to populate pins" }, { status: 500 });
  }
}
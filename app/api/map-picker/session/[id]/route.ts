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

// Accept BOTH POST and PUT for populating pins (easier for Method)
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handlePopulate(req, context);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handlePopulate(req, context);
}

// Shared logic
async function handlePopulate(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    let session = sessions.get(id);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const { pins: rawPins } = await req.json();

    const normalizedPins = (rawPins || []).map((pin: any) => ({
      id: pin.id || null,
      lat: parseFloat(pin.Latitude || pin.lat || pin[session.latField]) || 0,
      lng: parseFloat(pin.Longitude || pin.lng || pin[session.lngField]) || 0,
      ...pin, // Keep all original fields
    }));

    sessions.set(id, {
      ...session,
      pins: normalizedPins,
    });

    console.log(`✅ Session ${id} populated with ${normalizedPins.length} pins`);

    return NextResponse.json({ 
      success: true, 
      pinCount: normalizedPins.length 
    });
  } catch (error) {
    console.error("Populate pins error:", error);
    return NextResponse.json({ error: "Failed to populate pins" }, { status: 500 });
  }
}
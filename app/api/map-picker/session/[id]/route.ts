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
      console.log(`❌ Session not found: ${id}`);
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    console.log(`✅ Session loaded: ${id} with ${session.pins?.length || 0} pins`);
    return NextResponse.json(session);
  } catch (error) {
    console.error("Session fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Accept POST or PUT to populate pins
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handlePopulate(req, context);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handlePopulate(req, context);
}

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
      lat: parseFloat(pin.Latitude || pin.lat) || 0,
      lng: parseFloat(pin.Longitude || pin.lng) || 0,
      ...pin,
    }));

    sessions.set(id, { ...session, pins: normalizedPins });

    console.log(`✅ Populated session ${id} with ${normalizedPins.length} pins`);
    return NextResponse.json({ success: true, pinCount: normalizedPins.length });
  } catch (error) {
    console.error("Populate error:", error);
    return NextResponse.json({ error: "Failed to populate" }, { status: 500 });
  }
}
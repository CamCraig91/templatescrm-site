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

// NEW: Populate existing pins from Method
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = sessions.get(id);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const { pins } = await req.json();

    // Update session with pins (merge with existing config)
    sessions.set(id, {
      ...session,
      pins: pins || [],
    });

    console.log(`✅ Session ${id} populated with ${pins?.length || 0} pins`);

    return NextResponse.json({ success: true, pinCount: pins?.length || 0 });
  } catch (error) {
    console.error("Populate pins error:", error);
    return NextResponse.json({ error: "Failed to populate pins" }, { status: 500 });
  }
}
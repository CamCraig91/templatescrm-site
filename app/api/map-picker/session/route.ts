import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

const sessions = new Map<string, any>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = randomUUID();

    sessions.set(sessionId, {
      ...body,
      createdAt: Date.now(),
      pins: [], // Start with empty pins
    });

    console.log(`✅ New session created: ${sessionId}`);
    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}

export { sessions };
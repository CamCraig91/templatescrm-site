import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

// In-memory session store
const sessions: Record<string, any> = {};

export async function POST(req: Request) {
  const body = await req.json();

  const sessionId = randomUUID();

  sessions[sessionId] = {
    ...body,
    createdAt: Date.now(),
  };

  return NextResponse.json({ sessionId });
}

// Export store for other routes
export { sessions };

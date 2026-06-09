import { NextRequest, NextResponse } from "next/server";
import { sessions } from "../route";   // Import from the session route file

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
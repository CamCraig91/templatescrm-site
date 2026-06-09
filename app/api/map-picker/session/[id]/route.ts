import { NextRequest, NextResponse } from "next/server";
import { sessions } from "@/app/api/map-picker/sessions";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const session = sessions[id];

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(session);
}

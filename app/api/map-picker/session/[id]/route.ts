import { NextResponse } from "next/server";
import { sessions } from "../../route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = sessions[params.id];

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(session);
}

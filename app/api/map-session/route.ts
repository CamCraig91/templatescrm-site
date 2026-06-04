const sessions = new Map<string, any>();

export async function POST(req: Request) {
  const body = await req.json();
  const id = Math.random().toString(36).substring(2, 10);

  sessions.set(id, body);

  return Response.json({ sessionId: id });
}

export async function GET(req: Request) {
  const session = new URL(req.url).searchParams.get("session");
  if (!session) return Response.json([]);

  return Response.json(sessions.get(session) || []);
}

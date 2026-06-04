const sessions = new Map<string, any>();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return Response.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const id = Math.random().toString(36).substring(2, 10);

    sessions.set(id, body);

    return Response.json({ sessionId: id, status: "ok" });
  } catch (err) {
    return Response.json(
      { error: "Failed to process POST request." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = new URL(req.url).searchParams.get("session");

    if (!session) {
      return Response.json(
        { error: "Missing session parameter." },
        { status: 400 }
      );
    }

    const data = sessions.get(session);

    if (!data) {
      return Response.json(
        { error: "Session not found or expired.", entries: [] },
        { status: 404 }
      );
    }

    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: "Failed to process GET request." },
      { status: 500 }
    );
  }
}

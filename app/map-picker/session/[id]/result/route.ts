import { NextResponse } from "next/server";
import { sessions } from "../../../route";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = sessions[params.id];
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const { pins } = await req.json();

  const {
    table,
    parentField,
    parentId,
    latField,
    lngField,
    statusField,
    fields,
    methodApiKey,
  } = session;

  // Update Method
  for (const pin of pins) {
    const body: any = {
      [latField]: pin.lat,
      [lngField]: pin.lng,
    };

    // Attach parent for new records
    if (pin.id === null) {
      body[parentField] = parentId;
    }

    // Dynamic fields
    fields.forEach((f: any) => {
      body[f.key] = pin[f.key];
    });

    // Create or update
    if (pin.id === null) {
      await fetch(`https://rest.method.me/api/v1/tables/${table}`, {
        method: "POST",
        headers: {
          Authorization: `APIKey ${methodApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`https://rest.method.me/api/v1/tables/${table}/${pin.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `APIKey ${methodApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }
  }

  // Cleanup session
  delete sessions[params.id];

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import { sessions } from "@/app/api/map-picker/sessions";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const session = sessions.get(id);

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
 sessions.delete(id)


  return NextResponse.json({ success: true });
}

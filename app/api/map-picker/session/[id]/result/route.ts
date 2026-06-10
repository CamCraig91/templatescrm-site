import { NextRequest, NextResponse } from "next/server";
import { sessions } from "../../../sessions";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await sessions.get(id);

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
      fields,
      methodApiKey,
    } = session;

    for (const pin of pins) {
      const body: any = {
        [latField]: pin.lat,
        [lngField]: pin.lng,
      };

      // Only attach parent on new pins
      if (pin.id === null && parentField && parentId) {
        body[parentField] = parentId;
      }

      // Add dynamic fields (skip readonly)
      fields.forEach((f: any) => {
        if (f.type === "readonly") return;
        if (pin[f.key] !== undefined) {
          body[f.key] = pin[f.key];
        }
      });

      const url = pin.id === null
        ? `https://rest.method.me/api/v1/tables/${table}`
        : `https://rest.method.me/api/v1/tables/${table}/${pin.id}`;

      const method = pin.id === null ? "POST" : "PATCH";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `APIKey ${methodApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.warn(`Method API ${method} failed for pin ${pin.id}:`, await response.text());
      } else {
        console.log(`✅ Pin ${pin.id ?? "new"} saved to Method`);
      }
    }

    // Clean up session
    await sessions.delete(id);
    console.log(`✅ Session ${id} completed and deleted`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Result save error:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
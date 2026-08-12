import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export async function GET() {
  try {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });
    await redis.set("keepalive", Date.now(), { ex: 60 * 60 * 24 * 40 }); // 40 days
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("keep-alive failed", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

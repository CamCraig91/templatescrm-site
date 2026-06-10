/**
 * sessions.ts — Upstash Redis (via Vercel KV-compatible env vars)
 * Env vars set automatically by Upstash integration:
 *   KV_REST_API_URL, KV_REST_API_TOKEN
 */

const SESSION_TTL_SECONDS = 60 * 60 * 4; // 4 hours

function redisAvailable(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function getRedis() {
  const { Redis } = require("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

async function redisGet(id: string): Promise<any | undefined> {
  const val = await getRedis().get(`session:${id}`);
  return val ?? undefined;
}

async function redisSet(id: string, value: any): Promise<void> {
  await getRedis().set(`session:${id}`, value, { ex: SESSION_TTL_SECONDS });
}

async function redisDelete(id: string): Promise<void> {
  await getRedis().del(`session:${id}`);
}

// ── File fallback (local dev only) ───────────────────────────────────────────
import fs from "fs";
import path from "path";
import os from "os";

const SESSION_DIR = path.join(os.tmpdir(), "map-picker-sessions");
if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });

function safePath(id: string) {
  return path.join(SESSION_DIR, `${id.replace(/[^a-zA-Z0-9\-_]/g, "")}.json`);
}

function fileGet(id: string): any | undefined {
  try {
    const fp = safePath(id);
    return fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, "utf8")) : undefined;
  } catch { return undefined; }
}

function fileSet(id: string, value: any): void {
  try { fs.writeFileSync(safePath(id), JSON.stringify(value), "utf8"); } catch {}
}

function fileDelete(id: string): void {
  try { const fp = safePath(id); if (fs.existsSync(fp)) fs.unlinkSync(fp); } catch {}
}

// ── Unified async API ─────────────────────────────────────────────────────────
export const sessions = {
  async get(id: string): Promise<any | undefined> {
    if (redisAvailable()) return redisGet(id);
    return fileGet(id);
  },

  async set(id: string, value: any): Promise<void> {
    if (redisAvailable()) return redisSet(id, value);
    fileSet(id, value);
  },

  async delete(id: string): Promise<void> {
    if (redisAvailable()) return redisDelete(id);
    fileDelete(id);
  },

  async has(id: string): Promise<boolean> {
    return (await this.get(id)) !== undefined;
  },
};
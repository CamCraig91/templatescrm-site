import fs from "fs";
import path from "path";
import os from "os";

// Persist sessions to a temp dir so they survive Next.js hot reloads.
// In production with multiple instances you'd use Redis/DB instead.
const SESSION_DIR = path.join(os.tmpdir(), "map-picker-sessions");

if (!fs.existsSync(SESSION_DIR)) {
  fs.mkdirSync(SESSION_DIR, { recursive: true });
}

function filePath(id: string) {
  // Sanitise id to prevent path traversal
  const safe = id.replace(/[^a-zA-Z0-9\-_]/g, "");
  return path.join(SESSION_DIR, `${safe}.json`);
}

export const sessions = {
  get(id: string): any | undefined {
    try {
      const fp = filePath(id);
      if (!fs.existsSync(fp)) return undefined;
      return JSON.parse(fs.readFileSync(fp, "utf8"));
    } catch {
      return undefined;
    }
  },

  set(id: string, value: any): void {
    try {
      fs.writeFileSync(filePath(id), JSON.stringify(value), "utf8");
    } catch (e) {
      console.error("Session write error:", e);
    }
  },

  delete(id: string): void {
    try {
      const fp = filePath(id);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    } catch {}
  },

  has(id: string): boolean {
    return fs.existsSync(filePath(id));
  },
};
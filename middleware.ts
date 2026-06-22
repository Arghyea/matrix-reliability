import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ── Rate limiting for the lead endpoint ────────────────────────────────────
// Primary: Upstash Redis (persistent, shared across all serverless instances).
// Fallback: in-memory (used only when Upstash env vars are absent, e.g. local
// dev) — note this resets on cold start and is per-instance, so it's a soft
// guard, not real protection. Production must have the Upstash vars set.

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit =
  url && token
    ? new Ratelimit({
        redis: new Redis({ url, token }),
        // 5 submissions per IP per 10 minutes (sliding window).
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        prefix: "mxf:lead",
        analytics: false,
      })
    : null;

// In-memory fallback
const WINDOW_MS = 60_000;
const MAX_HITS = 8;
const hits = new Map<string, { count: number; reset: number }>();
function memLimit(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (e.count >= MAX_HITS) return false;
  e.count++;
  return true;
}

const TOO_MANY = NextResponse.json(
  { ok: false, error: "Too many requests. Please try again in a few minutes." },
  { status: 429 }
);

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/api/lead" && req.method === "POST") {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) return TOO_MANY;
    } else if (!memLimit(ip)) {
      return TOO_MANY;
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/api/lead"] };

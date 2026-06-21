import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lightweight in-memory rate limiter for the lead endpoint.
// NOTE: in-memory state is per-serverless-instance and resets on cold start.
// For production scale, swap this for Upstash Redis / Vercel KV (see README).
const WINDOW_MS = 60_000; // 1 minute
const MAX_HITS = 8; // max lead submissions per IP per minute
const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_HITS) return false;
  entry.count++;
  return true;
}

export function middleware(req: NextRequest) {
  // Only guard the lead submission endpoint.
  if (req.nextUrl.pathname === "/api/lead" && req.method === "POST") {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/api/lead"] };

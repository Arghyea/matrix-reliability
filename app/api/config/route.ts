import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Exposes the *public* Turnstile site key at request time. Reading it here
// (server runtime) works even when the env var is marked "Sensitive" in Vercel,
// which would otherwise be stripped from the client build.
export async function GET() {
  return NextResponse.json({
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  });
}

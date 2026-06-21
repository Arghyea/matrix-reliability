// Server-side rate proxy. Fetches the upstream feed, applies your margins
// HERE (server only), and returns just the final buy/sell prices. The
// browser never sees the raw feed or your spread. Cached for 60s so we
// don't hammer the upstream worker on every page load.
import { NextResponse } from "next/server";
import { MARGINS, RATES_API_URL } from "@/lib/margins";
import { ALLOWED, type RateMap } from "@/lib/currencies";

export const revalidate = 60;

export async function GET() {
  try {
    const res = await fetch(RATES_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    const list: any[] = Array.isArray(data) ? data : data.rates || [];

    const out: RateMap = {};
    const allowed = new Set<string>(ALLOWED);
    for (const item of list) {
      if (!item?.CurrencyCode) continue;
      const code = String(item.CurrencyCode).toUpperCase();
      if (!allowed.has(code)) continue;
      const bid = parseFloat(item.Bid || "0");
      const ask = parseFloat(item.Ask || "0");
      const mid = (bid + ask) / 2 || ask || bid;
      if (!mid) continue;
      const m = MARGINS[code] || { buy: 0, sell: 0 };
      out[code] = { buy: ask + m.buy, sell: bid + m.sell };
    }

    return NextResponse.json(
      { ok: true, rates: out, updated: new Date().toISOString() },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Rates temporarily unavailable" },
      { status: 502 }
    );
  }
}

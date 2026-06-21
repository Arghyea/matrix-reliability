// ⚠️ SERVER-ONLY. Never import this into a Client Component.
// These are your live spreads. They are applied inside /api/rates so the
// browser only ever receives the final buy/sell price, never the margin.

import "server-only";

export const MARGINS: Record<string, { buy: number; sell: number }> = {
  AED: { buy: 0.50, sell: -1.25 }, AUD: { buy: 0.80, sell: -0.50 },
  BDT: { buy: 0.07, sell: -0.04 }, CAD: { buy: 1.95, sell: -1.00 },
  CHF: { buy: 1.80, sell: -0.80 }, CNY: { buy: 0.70, sell: -0.30 },
  CZK: { buy: 2.60, sell: -0.05 }, DKK: { buy: 1.70, sell: -0.04 },
  EUR: { buy: 1.25, sell: -0.80 }, GBP: { buy: 2.50, sell: -0.80 },
  HKD: { buy: 0.70, sell: -0.20 }, IDR: { buy: 0.0008, sell: -0.00015 },
  JPY: { buy: 1.50, sell: -0.006 }, KRW: { buy: 0.008, sell: -0.0027 },
  LKR: { buy: 0.15, sell: -0.12 }, MUR: { buy: 0.30, sell: -0.25 },
  MYR: { buy: 1.40, sell: -0.45 }, NOK: { buy: 0.90, sell: -0.25 },
  NZD: { buy: 0.90, sell: -0.40 }, QAR: { buy: 0.22, sell: -0.60 },
  RUB: { buy: 0.12, sell: -0.02 }, SAR: { buy: 0.60, sell: -0.60 },
  SEK: { buy: 0.30, sell: -0.20 }, SGD: { buy: 1.10, sell: -0.30 },
  THB: { buy: 0.12, sell: -0.10 }, USD: { buy: 1.00, sell: -0.60 },
  VND: { buy: 0.00058, sell: -0.00003 }, ZAR: { buy: 0.35, sell: -0.35 },
};

export const RATES_API_URL =
  process.env.RATES_API_URL ||
  "https://proud-pine-9f37.tanujrajput-dev.workers.dev/";

// CLIENT-SAFE currency data. No margins live here — those are server-only
// (see lib/margins.ts) so competitors can never read your spread from the
// browser. This file only holds the public list, display names, and the
// minimum order sizes used for form validation UX.

export const ALLOWED = [
  "AED","AUD","BDT","CAD","CHF","CNY","CZK","DKK",
  "EUR","GBP","HKD","IDR","JPY","KRW","LKR","MUR",
  "MYR","NOK","NZD","QAR","RUB","SAR","SEK","SGD",
  "THB","USD","VND","ZAR",
] as const;

export type CurrencyCode = (typeof ALLOWED)[number];

export const CURRENCY_META: Record<CurrencyCode, { name: string; flag: string }> = {
  AED: { name: "UAE Dirham", flag: "🇦🇪" },
  AUD: { name: "Australian Dollar", flag: "🇦🇺" },
  BDT: { name: "Bangladeshi Taka", flag: "🇧🇩" },
  CAD: { name: "Canadian Dollar", flag: "🇨🇦" },
  CHF: { name: "Swiss Franc", flag: "🇨🇭" },
  CNY: { name: "Chinese Yuan", flag: "🇨🇳" },
  CZK: { name: "Czech Koruna", flag: "🇨🇿" },
  DKK: { name: "Danish Krone", flag: "🇩🇰" },
  EUR: { name: "Euro", flag: "🇪🇺" },
  GBP: { name: "British Pound", flag: "🇬🇧" },
  HKD: { name: "Hong Kong Dollar", flag: "🇭🇰" },
  IDR: { name: "Indonesian Rupiah", flag: "🇮🇩" },
  JPY: { name: "Japanese Yen", flag: "🇯🇵" },
  KRW: { name: "South Korean Won", flag: "🇰🇷" },
  LKR: { name: "Sri Lankan Rupee", flag: "🇱🇰" },
  MUR: { name: "Mauritian Rupee", flag: "🇲🇺" },
  MYR: { name: "Malaysian Ringgit", flag: "🇲🇾" },
  NOK: { name: "Norwegian Krone", flag: "🇳🇴" },
  NZD: { name: "New Zealand Dollar", flag: "🇳🇿" },
  QAR: { name: "Qatari Riyal", flag: "🇶🇦" },
  RUB: { name: "Russian Ruble", flag: "🇷🇺" },
  SAR: { name: "Saudi Riyal", flag: "🇸🇦" },
  SEK: { name: "Swedish Krona", flag: "🇸🇪" },
  SGD: { name: "Singapore Dollar", flag: "🇸🇬" },
  THB: { name: "Thai Baht", flag: "🇹🇭" },
  USD: { name: "US Dollar", flag: "🇺🇸" },
  VND: { name: "Vietnamese Dong", flag: "🇻🇳" },
  ZAR: { name: "South African Rand", flag: "🇿🇦" },
};

// Minimum order quantity per currency (in FX units). Public — drives the
// "Minimum order: N CUR" warning. Safe to expose.
export const MIN_QTY: Record<string, number> = {
  AED: 500, AUD: 200, BDT: 5000, CAD: 200,
  CHF: 200, CNY: 500, CZK: 500, DKK: 500,
  EUR: 200, GBP: 200, HKD: 500, IDR: 500000,
  JPY: 10000, KRW: 50000, LKR: 5000, MUR: 1000,
  MYR: 500, NOK: 500, NZD: 200, QAR: 500,
  RUB: 2000, SAR: 500, SEK: 500, SGD: 200,
  THB: 2000, USD: 200, VND: 500000, ZAR: 500,
};
export const DEFAULT_MIN = 200;

// Currencies shown first in the dropdown.
export const PREFERRED: CurrencyCode[] = ["USD","EUR","GBP","AUD","CAD","SGD","AED","THB"];

export function ratePrecision(code: string): number {
  return code === "VND" ? 6 : code === "JPY" ? 3 : 4;
}
export function tickerPrecision(code: string): number {
  return code === "VND" ? 6 : 2;
}

export type RateMap = Record<string, { buy: number; sell: number }>;

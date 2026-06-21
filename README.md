# Matrix Forex — Website (Next.js, no Shopify)

A fast, secure, self-hosted replacement for the Shopify site. Built with
**Next.js 14 (App Router) + TypeScript + Tailwind**, designed to deploy to
**Vercel**. Includes a live forex calculator (Buy / Sell / Send), a secure
lead-to-email pipeline, and a file-based blog you can publish to by adding a
file.

---

## 1. What's included

| Area | Status |
|---|---|
| Homepage with live Buy/Sell/Send calculator | ✅ ported from your real logic |
| Lead capture → emailed to **one** address | ✅ `/api/lead` via Resend |
| Live rates with **margins applied server-side** | ✅ `/api/rates` (spread never reaches the browser) |
| Google Ads / Meta / UTM attribution on every lead | ✅ ported from your Shopify tracking |
| Blog (list + post pages, SEO metadata) | ✅ file-based MDX |
| About / Services / Contact / Privacy | ✅ starter pages (edit the copy) |
| Security headers, rate limiting, bot honeypot, optional CAPTCHA | ✅ |
| Sitemap + robots.txt | ✅ auto-generated |
| Your brand font (Aeonik) + exact green palette | ✅ pulled from the theme export |

---

## 2. Run it locally

Requires **Node.js 18.18+** (Node 20 recommended).

```bash
npm install
cp .env.example .env.local   # then fill in the values (see section 4)
npm run dev                  # open http://localhost:3000
```

## 3. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New → Project** → import the repo. Framework is
   auto-detected as Next.js; no build settings to change.
3. Add the environment variables from section 4 under
   **Settings → Environment Variables**.
4. Deploy. Point `matrixforex.in` at the project under **Settings → Domains**.

## 4. Environment variables (where leads go, etc.)

Copy `.env.example` → `.env.local` (local) and add the same keys in Vercel.

| Variable | What it does |
|---|---|
| `LEAD_TO_EMAIL` | **The single inbox every lead is sent to.** |
| `LEAD_FROM_EMAIL` | The "from" address (must be on a domain verified in Resend). |
| `RESEND_API_KEY` | Free key from [resend.com](https://resend.com). |
| `NEXT_PUBLIC_SITE_URL` | `https://matrixforex.in` (for canonical + sitemap). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile bot protection. Leave blank to disable. |

**Email setup (5 min):** create a Resend account → **Domains** → add
`matrixforex.in` and follow the DNS records → create an **API key** → paste it
into `RESEND_API_KEY`. Until the domain is verified you can send from
`onboarding@resend.dev` for testing.

> Prefer your existing mailbox/SMTP instead of Resend? The only file to change
> is `app/api/lead/route.ts` — swap the Resend call for `nodemailer`.

## 5. Publishing a blog post (easy path)

Each post is one Markdown file in `content/blog/`. To publish:

1. Create `content/blog/my-post-title.mdx`.
2. Add the header block and write in Markdown:

```mdx
---
title: "Your headline here"
excerpt: "One or two sentences shown on the blog list."
date: "2026-06-21"
author: "Matrix Forex"
category: "Travel Money"
---

## A heading

Your paragraphs. **Bold**, _italic_, [links](https://matrixforex.in), lists —
all standard Markdown.
```

3. Commit and push. Vercel rebuilds and the post is live at
   `/blog/my-post-title`. The URL is the filename.

## 6. Editing site content

- **Phone, email, WhatsApp, address, nav menu, RBI line:** all in one file —
  `lib/site.ts`.
- **Homepage sections (services, why-us, CTA):** `app/page.tsx`.
- **Currencies shown / minimum order sizes:** `lib/currencies.ts`.
- **Your margins (server-only, private):** `lib/margins.ts`.
- **Brand colours:** `tailwind.config.ts`.

### Want a visual editor (for non-developers)?
The blog is intentionally file-based so it deploys with zero external services.
If your team would rather click "New Post" in a dashboard than edit files, the
clean upgrade is a headless CMS — **Sanity** (free tier, hosted editor) pairs
best with this stack. The swap touches only `lib/blog.ts` and the two blog
pages; everything else stays. Ask and this can be wired up.

## 7. Security measures in place

- **Strict security headers** (CSP, HSTS, X-Frame-Options: DENY, nosniff,
  Referrer-Policy, Permissions-Policy) — `next.config.mjs`.
- **Margins computed server-side** — the browser only ever sees final prices,
  never your spread (`/api/rates` + `lib/margins.ts`).
- **Lead endpoint hardened:** server-side validation (zod), a hidden honeypot
  field, per-IP rate limiting (`middleware.ts`), and optional Cloudflare
  Turnstile. Email credentials live only on the server.
- **No secrets in client code**; `X-Powered-By` header removed.
- HTTPS is automatic on Vercel.

**Ongoing (not one-time):** keep dependencies patched (`npm audit`,
Dependabot), and for high traffic move the rate-limiter to Vercel KV / Upstash
(noted in `middleware.ts`). Consider putting Cloudflare in front for WAF/DDoS.

## 8. Two things to confirm

1. **USD buy margin = 1.00.** Carried over from your latest hero-form code
   (`lib/margins.ts`). Confirm it's current before going live.
2. **Rates worker URL** (`https://proud-pine-9f37...workers.dev`) is your
   existing Cloudflare Worker, now called server-side. Override it without
   touching code by setting a `RATES_API_URL` env var.

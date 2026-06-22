#!/usr/bin/env python3
"""One-time importer: pull Matrix Forex Shopify blog posts into MDX + local covers."""
import os, re, json, urllib.request, datetime
from bs4 import BeautifulSoup
from markdownify import markdownify as md

LISTING = "https://matrixforex.in/blogs/matrix-forex"
HDR = {"User-Agent": "Mozilla/5.0 (migration)"}
ROOT = os.getcwd()
IMG_DIR = os.path.join(ROOT, "public", "img", "blog")
BLOG_DIR = os.path.join(ROOT, "content", "blog")
os.makedirs(IMG_DIR, exist_ok=True); os.makedirs(BLOG_DIR, exist_ok=True)

def get(url, binary=False):
    req = urllib.request.Request(url, headers=HDR)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read() if binary else r.read().decode("utf-8", "ignore")

MONTHS = {m: i for i, m in enumerate(
    ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], 1)}
def iso_date(s):
    m = re.match(r"([A-Z][a-z]{2}) (\d{1,2}), (\d{4})", s or "")
    if not m: return datetime.date.today().isoformat()
    return f"{m.group(3)}-{MONTHS[m.group(1)]:02d}-{int(m.group(2)):02d}"

def categorize(slug):
    s = slug
    if any(k in s for k in ["inr-to-", "exchange-rate", "live-rate", "cross-rate"]): return "Rate Trends"
    if any(k in s for k in ["forex-card", "multi-currency", "debit-card", "reload", "track-forex", "block-and-replace"]): return "Forex Cards"
    if any(k in s for k in ["remittance", "swift", "15ca", "15cb", "a2-form", "nre", "nro", "lrs", "purpose-code", "tcs", "outward", "send-money"]): return "Remittance"
    if any(k in s for k in ["travel", "guide-for-travelling", "best-currency", "best-time", "first-time", "world-cup", "fifa", "wedding", "leftover", "documents", "rbi-rules", "gst", "fraud", "medical", "business-travel", "students", "mexico", "canada", "usa"]): return "Travel Tips"
    return "Guides"

def esc(t):  # keep MDX from choking on prose
    return t.replace("<", "&lt;").replace("{", "&#123;").replace("}", "&#125;")

# 1) parse listing
soup = BeautifulSoup(get(LISTING), "html.parser")
arts = {}
for a in soup.find_all("a", href=True):
    m = re.search(r"/blogs/matrix-forex/([a-z0-9\-]+)$", a["href"])
    if not m: continue
    slug = m.group(1)
    if slug in arts: continue
    img = a.find("img")
    cover = (img.get("src") if img else "") or ""
    if cover.startswith("//"): cover = "https:" + cover
    txt = re.sub(r"\s+", " ", a.get_text(" ", strip=True))
    dm = re.search(r"[A-Z][a-z]{2} \d{1,2}, \d{4}", txt)
    arts[slug] = {"cover": cover.split("?")[0], "date": iso_date(dm.group(0) if dm else "")}

written, failed = 0, []
for slug, meta in arts.items():
    try:
        html = get(f"{LISTING}/{slug}")
        s = BeautifulSoup(html, "html.parser")
        def metaprop(p):
            t = s.find("meta", property=p) or s.find("meta", attrs={"name": p})
            return (t.get("content") or "").strip() if t else ""
        title = metaprop("og:title") or (s.title.string if s.title else slug)
        title = re.sub(r"\s*[—-]\s*Matrix Forex\s*$", "", title).strip()
        excerpt = metaprop("meta-description") or metaprop("og:description") or metaprop("description")
        body_el = s.select_one(".bp-body.rte") or s.select_one(".bp-body")
        if not body_el:
            failed.append((slug, "no body")); continue
        body = md(str(body_el), heading_style="ATX", strip=["img"]).strip()
        body = re.sub(r"\n{3,}", "\n\n", body)
        body = esc(body)
        # download cover
        cover_path = ""
        if meta["cover"]:
            ext = os.path.splitext(meta["cover"])[1].lower() or ".png"
            if ext not in (".png", ".jpg", ".jpeg", ".webp"): ext = ".png"
            fname = f"{slug}{ext}"
            try:
                data = get(meta["cover"], binary=True)
                open(os.path.join(IMG_DIR, fname), "wb").write(data)
                cover_path = f"/img/blog/{fname}"
            except Exception as e:
                cover_path = ""
        fm = ["---",
              f"title: {json.dumps(title)}",
              f"excerpt: {json.dumps(excerpt)}",
              f"date: {json.dumps(meta['date'])}",
              'author: "Ansh Aggarwal"',
              f"category: {json.dumps(categorize(slug))}"]
        if cover_path: fm.append(f"cover: {json.dumps(cover_path)}")
        fm += ["---", "", body, ""]
        open(os.path.join(BLOG_DIR, f"{slug}.mdx"), "w", encoding="utf-8").write("\n".join(fm))
        written += 1
    except Exception as e:
        failed.append((slug, str(e)[:60]))

print(f"imported: {written} posts")
print(f"covers downloaded: {len(os.listdir(IMG_DIR))}")
if failed:
    print(f"failed ({len(failed)}):")
    for s, e in failed[:10]: print("  -", s, "|", e)

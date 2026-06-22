import data from "./travel-guides.json";

export type GuideSection = { title: string; body: string };
export type GuideFaq = { q: string; a: string };

type RawGuide = {
  meta_title: string;
  meta_desc: string;
  h1: string;
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

export type TravelGuide = RawGuide & {
  slug: string;
  name: string;
  flag: string;
  region: "Asia" | "Europe";
};

const NAMES: Record<string, string> = {
  schengen: "Schengen & Eurozone",
  "south-korea": "South Korea",
  "sri-lanka": "Sri Lanka",
};

const FLAGS: Record<string, string> = {
  barcelona: "🇪🇸",
  indonesia: "🇮🇩",
  japan: "🇯🇵",
  london: "🇬🇧",
  malaysia: "🇲🇾",
  prague: "🇨🇿",
  schengen: "🇪🇺",
  singapore: "🇸🇬",
  "south-korea": "🇰🇷",
  "sri-lanka": "🇱🇰",
  switzerland: "🇨🇭",
  vienna: "🇦🇹",
  vietnam: "🇻🇳",
};

const REGION: Record<string, "Asia" | "Europe"> = {
  japan: "Asia",
  indonesia: "Asia",
  malaysia: "Asia",
  singapore: "Asia",
  "south-korea": "Asia",
  "sri-lanka": "Asia",
  vietnam: "Asia",
  barcelona: "Europe",
  london: "Europe",
  prague: "Europe",
  schengen: "Europe",
  switzerland: "Europe",
  vienna: "Europe",
};

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const raw = data as Record<string, RawGuide>;

export function getGuideSlugs(): string[] {
  return Object.keys(raw);
}

export function getGuide(slug: string): TravelGuide | null {
  const g = raw[slug];
  if (!g) return null;
  return {
    ...g,
    slug,
    name: NAMES[slug] || titleCase(slug),
    flag: FLAGS[slug] || "🌍",
    region: REGION[slug] || "Asia",
  };
}

export function getAllGuides(): TravelGuide[] {
  return getGuideSlugs()
    .map((s) => getGuide(s)!)
    .sort((a, b) => a.name.localeCompare(b.name));
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Matrix Forex brand palette (pulled from the live theme)
        accent: "#02e375",     // bright signature green
        "mid-green": "#00b85e",
        "dark-green": "#00341B",
        "deep": "#07100a",     // near-black green
        ink: "#0e1a11",
        mint: "#e8fff3",
        "mint-2": "#b6ffd8",
        g1: "#f3f6f4",
        g2: "#e2ece6",
        g3: "#b8ccbf",
        g4: "#6a8c74",
        g5: "#304838",
        // Soft editorial palette — used on the blog for a calmer, less harsh look
        paper: "#f6f9f6",      // page background
        sage: "#e7efe9",       // soft card border
        leaf: "#0fa45f",       // muted emerald accent (calmer than neon)
        "leaf-dark": "#0c7d46",
        forest: "#173a25",     // soft deep-green for headings
      },
      fontFamily: {
        display: ["var(--font-aeonik)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 24px 60px -12px rgba(2,52,27,.28), 0 4px 12px rgba(2,52,27,.10)",
        glow: "0 8px 28px rgba(2,227,117,.45)",
      },
      borderRadius: { xl2: "1.75rem" },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        ping2: { "0%": { transform: "scale(1)", opacity: "0.8" }, "75%,100%": { transform: "scale(2)", opacity: "0" } },
        pop: { "0%": { opacity: "0", transform: "translateY(8px) scale(.96)" }, "100%": { opacity: "1", transform: "translateY(0) scale(1)" } },
      },
      animation: {
        marquee: "marquee 54s linear infinite",
        ping2: "ping2 1.4s cubic-bezier(0,0,.2,1) infinite",
        pop: "pop .45s cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};
export default config;

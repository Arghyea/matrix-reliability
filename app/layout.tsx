import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Buy, Sell & Send Forex at Zero-Markup Rates`,
    template: `%s · ${site.name}`,
  },
  description:
    "Matrix Forex — RBI-authorised foreign exchange. Buy currency, sell leftover forex, send money abroad, and order forex cards at transparent live rates.",
  openGraph: { type: "website", siteName: site.name, url: site.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

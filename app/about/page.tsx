import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: "About Matrix Forex." };

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">About us</span>
      <h1 className="mt-2 font-display text-5xl font-extrabold text-ink">{site.legalName}</h1>
      <div className="prose-mx mt-8">
        <p>
          Matrix Forex is an RBI-Authorised Dealer Category-II foreign exchange and
          remittance business. We help travellers, students, and businesses buy, sell,
          and send foreign currency at transparent, bank-beating rates.
        </p>
        <p>
          <em>Replace this with your real story — years in business, branches, founder note,
          regulatory credentials. Edit this file at <code>app/about/page.tsx</code>.</em>
        </p>
        <h2>What we stand for</h2>
        <ul>
          <li>Transparent pricing with zero hidden markup.</li>
          <li>Full RBI / FEMA compliance on every transaction.</li>
          <li>Real human support, not bots.</li>
        </ul>
      </div>
    </div>
  );
}

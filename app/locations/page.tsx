import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations — Find Matrix Forex Branches Across India",
  description:
    "Visit a Matrix Forex branch for in-person currency exchange, forex cards and remittance. Branches in Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Pune, Kanpur and Tiruppur.",
};

type Branch = { city: string; area: string; address: string };

const BRANCHES: Branch[] = [
  { city: "Delhi", area: "Mehrauli", address: "7, Khullar Farms, Mandi Road, Mehrauli, Delhi 110030" },
  { city: "Mumbai", area: "Andheri East", address: "Raheja Platinum, Sag Baug Road, Off Andheri-Kurla Road, Marol, Andheri East, Mumbai 400059" },
  { city: "Bangalore", area: "Tasker Town", address: "Park Manor, No. 35/2, Park Road, Tasker Town, Bangalore 560051" },
  { city: "Chennai", area: "Royapettah", address: "Spaces 6th Floor - Express Avenue, EA Chambers Tower II, Whites Road Royapettah, Chennai, Tamil Nadu 600014" },
  { city: "Hyderabad", area: "Kondapur", address: "Krishe Emerald, SY No. 11, Kondapur Village, Serilingampally Mandal, Hyderabad 500038" },
  { city: "Pune", area: "Hadapsar", address: "Panchshil Futura, Magarpatta Road, Magarpatta City, Hadapsar, Pune 411028" },
  { city: "Kanpur", area: "The Mall Road", address: "Room No. 516, 5th Floor, City Centre, The Mall Road, Kanpur 208001" },
  { city: "Tiruppur", area: "Avinashi Road", address: "410, 2nd Floor, Lakshiyaa Complex, Avinashi Road, Tirupur 641602" },
];

function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Matrix Forex, " + address)}`;
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function Locations() {
  return (
    <>
      {/* Hero band */}
      <section
        className="relative overflow-hidden bg-deep"
        style={{ backgroundImage: "radial-gradient(115% 95% at 80% 10%, #0b3d27 0%, #00341B 40%, #05180e 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">Locations</span>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-white md:text-6xl">
            Find us in 8 cities<br />across India
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-g2">
            Walk in for instant forex cards, currency exchange and personalised remittance advice — every branch open Mon&ndash;Sat, 9am to 6pm.
          </p>
          <div className="mt-8 flex gap-8">
            <div><div className="font-display text-3xl font-extrabold text-white">8</div><div className="text-[12px] uppercase tracking-wide text-g4">branches</div></div>
            <div><div className="font-display text-3xl font-extrabold text-white">8</div><div className="text-[12px] uppercase tracking-wide text-g4">cities</div></div>
            <div><div className="font-display text-3xl font-extrabold text-white">Mon&ndash;Sat</div><div className="text-[12px] uppercase tracking-wide text-g4">opens daily</div></div>
          </div>
        </div>
      </section>

      {/* Branch grid */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((b) => (
            <div key={b.city} className="flex flex-col overflow-hidden rounded-2xl border border-g2 bg-white shadow-card">
              <div
                className="px-6 pb-5 pt-8"
                style={{ backgroundImage: "linear-gradient(160deg, #00341B 0%, #0b3d27 100%)" }}
              >
                <h2 className="font-display text-2xl font-extrabold leading-none text-white">{b.city}</h2>
                <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-accent">{b.area}</div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex gap-2.5">
                  <span className="mt-0.5 shrink-0"><PinIcon /></span>
                  <p className="text-[13.5px] leading-relaxed text-g5">{b.address}</p>
                </div>
                <div className="mt-3 flex items-center gap-2.5 text-[13.5px] text-g5">
                  <ClockIcon /> Mon&ndash;Sat 9:00am &ndash; 6:00pm
                </div>

                <div className="mt-auto flex gap-2.5 pt-6">
                  <a
                    href={mapsUrl(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-mint px-4 py-2 text-[13px] font-semibold text-dark-green transition hover:bg-accent/20"
                  >
                    Get directions
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M14 6l6 6-6 6" /></svg>
                  </a>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded-full border border-g2 px-4 py-2 text-[13px] font-semibold text-ink transition hover:border-accent"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" /></svg>
                    Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-dark-green p-8 text-center text-white md:p-10">
          <h3 className="font-display text-3xl font-extrabold">Prefer doorstep delivery?</h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-g3">
            Can&apos;t make it to a branch? Order online and we&apos;ll deliver currency or a forex card to your door.
          </p>
          <a href="/#book" className="mt-6 inline-block rounded-full bg-accent px-7 py-3 text-[14px] font-bold text-dark-green transition hover:-translate-y-0.5">
            Book forex online &rarr;
          </a>
        </div>
      </section>
    </>
  );
}

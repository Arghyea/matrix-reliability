import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Matrix Forex." };

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Contact</span>
      <h1 className="mt-2 font-display text-5xl font-extrabold text-ink">Talk to us</h1>
      <p className="mt-4 text-[15px] text-g5">
        Call, email, or message us on WhatsApp. For an instant quote, use the calculator on the home page.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <a href={site.phoneHref} className="rounded-2xl border border-g2 bg-g1 p-6 transition hover:border-accent">
          <div className="text-2xl">📞</div>
          <div className="mt-2 text-[12px] font-bold uppercase tracking-wide text-g4">Call</div>
          <div className="font-semibold text-ink">{site.phone}</div>
        </a>
        <a href={`mailto:${site.email}`} className="rounded-2xl border border-g2 bg-g1 p-6 transition hover:border-accent">
          <div className="text-2xl">✉️</div>
          <div className="mt-2 text-[12px] font-bold uppercase tracking-wide text-g4">Email</div>
          <div className="font-semibold text-ink">{site.email}</div>
        </a>
        <a href={`https://wa.me/${site.whatsapp}`} className="rounded-2xl border border-g2 bg-g1 p-6 transition hover:border-accent">
          <div className="text-2xl">💬</div>
          <div className="mt-2 text-[12px] font-bold uppercase tracking-wide text-g4">WhatsApp</div>
          <div className="font-semibold text-ink">Chat now</div>
        </a>
      </div>
      <p className="mt-8 text-[14px] text-g5">{site.address}</p>
    </div>
  );
}

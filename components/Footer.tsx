import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-deep text-g3">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-dark-green font-display text-lg font-extrabold">M</span>
            <span className="font-display text-lg font-bold">Matrix<span className="text-accent">Forex</span></span>
          </div>
          <p className="text-[13px] leading-relaxed">{site.tagline}</p>
          <p className="mt-3 text-[12px] leading-relaxed text-g4">{site.rbiLine}</p>
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white">Services</h4>
          <ul className="space-y-2 text-[13px]">
            <li><Link href="/services" className="hover:text-accent">Buy Forex</Link></li>
            <li><Link href="/services" className="hover:text-accent">Sell Forex</Link></li>
            <li><Link href="/services" className="hover:text-accent">Send Money Abroad</Link></li>
            <li><Link href="/services" className="hover:text-accent">Forex Cards</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white">Company</h4>
          <ul className="space-y-2 text-[13px]">
            <li><Link href="/about" className="hover:text-accent">About us</Link></li>
            <li><Link href="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white">Get in touch</h4>
          <ul className="space-y-2 text-[13px]">
            <li><a href={site.phoneHref} className="hover:text-accent">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a></li>
            <li><a href={`https://wa.me/${site.whatsapp}`} className="hover:text-accent">WhatsApp us</a></li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-[12px] text-g4">
        © {new Date().getFullYear()} {site.legalName}. All rights reserved.
      </div>
    </footer>
  );
}

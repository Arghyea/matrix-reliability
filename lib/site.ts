// Central place for everything that changes per-brand. Edit here, not in JSX.
export const site = {
  name: "Matrix Forex",
  legalName: "Matrix Forex Services Pvt. Ltd.",
  domain: "matrixforex.in",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://matrixforex.in",
  tagline: "Buy, sell & send forex at zero-markup rates.",
  // Contact details — used by the footer and the floating Call/WhatsApp buttons.
  phone: "+91 95608 07781",          // shown text (call button)
  phoneHref: "tel:+919560807781",     // Call → 9560807781
  whatsapp: "917428833412",           // WhatsApp → 7428833412 (with 91 country code for wa.me)
  email: "forex@matrixforex.in",
  address: "Gurugram, Haryana, India",
  rbiLine: "RBI-Authorised Dealer Category-II · Licence No. NDL-ADII-0023-2023",
  nav: [
    { label: "Travel Guides", href: "/travel-guide" },
    { label: "Blog", href: "/blog" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  social: { facebook: "", instagram: "", linkedin: "" },
};

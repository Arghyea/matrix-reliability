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
  email: "info@matrixforex.in",
  address: "Gurugram, Haryana, India",
  rbiLine: "RBI-Authorised Dealer Category-II · Licence No. NDL-ADII-0023-2023",
  nav: [
    { label: "Buy Forex", href: "/services" },
    { label: "Send Money", href: "/services" },
    { label: "Forex Card", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Travel Guides", href: "/travel-guide" },
    { label: "About", href: "/about" },
    { label: "Locations", href: "/locations" },
    { label: "Contact", href: "/contact" },
  ],
  social: { facebook: "", instagram: "", linkedin: "" },
};

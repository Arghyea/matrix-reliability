// Central place for everything that changes per-brand. Edit here, not in JSX.
export const site = {
  name: "Matrix Forex",
  legalName: "Matrix Forex Services Pvt. Ltd.",
  domain: "matrixforex.in",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://matrixforex.in",
  tagline: "Buy, sell & send forex at zero-markup rates.",
  // ↓↓↓ Fill these with your real details — they render in the header/footer.
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210", // digits only, for wa.me links
  email: "info@matrixforex.in",
  address: "Gurugram, Haryana, India",
  rbiLine: "RBI-Authorised Dealer Category-II · Licence No. <add here>",
  nav: [
    { label: "Buy Forex", href: "/services" },
    { label: "Send Money", href: "/services" },
    { label: "Forex Card", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
};

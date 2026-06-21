import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 prose-mx">
      <h1 className="font-display text-4xl font-extrabold text-ink">Privacy Policy</h1>
      <p><em>Replace this with your formal privacy policy. Edit <code>app/privacy/page.tsx</code>.</em></p>
      <p>We collect the information you submit through our forms (name, contact details, and forex requirement) solely to respond to your enquiry and provide our services, in line with applicable law.</p>
    </div>
  );
}

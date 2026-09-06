import type { Metadata } from "next";

import { ContactContent } from "@/features/contact/contact-content";

export const metadata: Metadata = {
  title: "Contact | Lily Protocol",
  description: "Get in touch with the Lily Protocol team for support, security disclosures, and community inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-sm font-semibold tracking-wide text-(--color-accent) uppercase">
          Inbound Channels
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-(--color-ink) sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-(--color-muted)">
          Connect with the Lily Protocol core team, report security vulnerabilities, or ask questions about our developer platform.
        </p>
      </header>

      <ContactContent />
    </div>
  );
}

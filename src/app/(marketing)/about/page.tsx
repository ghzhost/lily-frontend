import type { Metadata } from "next";

import { AboutContent } from "@/features/about/about-content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About | Lily Protocol",
  description: "Learn about the mission, core values, and ecosystem backing Lily Protocol.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-12">
        <p className="eyebrow text-(--color-accent)">
          About Us
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-(--color-ink) sm:text-5xl">
          About Lily Protocol
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-(--color-muted)">
          Pioneering deterministic compute, open economic rails, and coordination protocols for the next generation of decentralized networks.
        </p>
      </header>

      <AboutContent />
    </div>
  );
}

import type { Metadata } from "next";

import { CareersContent } from "@/features/careers/careers-content";

export const metadata: Metadata = {
  title: "Careers | Lily Protocol",
  description: "Join the Lily Protocol team and help build open protocols, decentralized compute, and developer tools.",
};

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="eyebrow text-(--color-accent)">
          Join Our Team
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-(--color-ink) sm:text-5xl">
          Careers at Lily Protocol
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-(--color-muted)">
          We are assembling a distributed team of engineers, researchers, and advocates to construct resilient open infrastructure.
        </p>
      </header>

      <CareersContent />
    </div>
  );
}

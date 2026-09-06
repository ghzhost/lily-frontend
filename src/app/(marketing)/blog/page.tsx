import type { Metadata } from "next";

import { BlogListing } from "@/features/blog/blog-listing";

export const metadata: Metadata = {
  title: "Blog | Lily Protocol",
  description: "Insights, architecture updates, and announcements from the Lily Protocol engineering team.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="eyebrow text-(--color-accent)">
          Engineering & Updates
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-(--color-ink) sm:text-5xl">
          Lily Protocol Blog
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-(--color-muted)">
          Deep dives into decentralized compute, cryptographic verification systems, and network updates.
        </p>
      </header>

      <BlogListing />
    </div>
  );
}

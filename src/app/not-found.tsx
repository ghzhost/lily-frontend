import type { Metadata, Route } from "next";
import Link from "next/link";

import { routes, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The requested ${siteConfig.name} page could not be found.`,
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-4 py-16 text-[var(--color-ink)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center">
        <p className="eyebrow text-[var(--color-accent)]">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
          The page you requested does not exist or has moved. Return to the Lily
          Protocol homepage to continue from a known route.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <Link
            className="rounded-full bg-[var(--color-ink)] px-5 py-3 text-white hover:opacity-90"
            href={routes.home as unknown as Route}
          >
            Return home
          </Link>
          <Link
            className="rounded-full border border-[var(--color-line)] px-5 py-3 hover:border-[var(--color-accent)]"
            href={routes.docs as unknown as Route}
          >
            View docs
          </Link>
        </div>
      </div>
    </main>
  );
}

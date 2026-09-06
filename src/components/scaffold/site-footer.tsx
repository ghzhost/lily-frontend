import type { Route } from "next";
import Link from "next/link";

import { getSectionRoutes, routeScaffolds } from "@/config/routes";
import { routes, siteConfig } from "@/config/site";
import type { RouteScaffold } from "@/types/site";

const defaultLegalRoutes: readonly RouteScaffold[] = getSectionRoutes("legal");
const defaultSupportRoutes: readonly RouteScaffold[] = [
  ...getSectionRoutes("docs"),
  ...routeScaffolds.filter((r) => r.id === "contact"),
];

type SiteFooterProps = {
  readonly legalRoutes?: readonly RouteScaffold[];
  readonly supportRoutes?: readonly RouteScaffold[];
};

export function SiteFooter({
  legalRoutes = defaultLegalRoutes,
  supportRoutes = defaultSupportRoutes,
}: SiteFooterProps = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              className="text-lg font-semibold tracking-tight"
              href={routes.home as Route}
            >
              {siteConfig.name}
            </Link>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Legal">
            <p className="eyebrow text-[var(--color-accent)]">Legal</p>
            <ul className="mt-4 grid gap-2">
              {legalRoutes.map((route) => (
                <li key={route.id}>
                  <Link
                    className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    href={route.path as Route}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <p className="eyebrow text-[var(--color-accent)]">Support</p>
            <ul className="mt-4 grid gap-2">
              {supportRoutes.map((route) => (
                <li key={route.id}>
                  <Link
                    className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    href={route.path as Route}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-[var(--color-line)] pt-6">
          <p className="text-sm text-[var(--color-muted)]">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

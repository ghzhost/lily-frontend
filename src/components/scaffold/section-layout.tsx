import type { ReactNode } from "react";

import { SectionNav } from "@/components/scaffold/section-nav";
import { SiteFooter } from "@/components/scaffold/site-footer";
import { SiteHeader } from "@/components/scaffold/site-header";

import type { RouteScaffold } from "@/types/site";

type SectionLayoutProps = {
  readonly title: string;
  readonly description: string;
  /**
   * Empty route arrays are valid for sections whose navigation is configured later.
   */
  readonly routes: readonly RouteScaffold[];
  readonly navLabel?: string;
  readonly children: ReactNode;
};

export function SectionLayout({
  title,
  description,
  routes,
  navLabel,
  children,
}: SectionLayoutProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--color-ink)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-[var(--shadow-soft)]"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="lg:w-80 lg:flex-none">
          <div className="surface rounded-3xl p-6">
            <p className="eyebrow text-(--color-accent)">{title}</p>
            <p className="mt-3 text-sm leading-7 text-(--color-muted)">
              {description}
            </p>
            <div className="mt-6">
              <SectionNav
                routes={routes}
                ariaLabel={navLabel ?? "Section routes"}
              />
            </div>
          </div>
        </aside>
        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">
          {children}
        </main>
      </div>
      <SiteFooter />
    </>
  );
}

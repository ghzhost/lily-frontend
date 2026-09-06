"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { RouteScaffold } from "@/types/site";

type SectionNavProps = {
  readonly routes: readonly RouteScaffold[];
  readonly ariaLabel?: string;
};

export function SectionNav({
  routes,
  ariaLabel = "Section routes",
}: SectionNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel}>
      <ul className="grid gap-2">
        {routes.map((route) => {
          const isActive = pathname === route.path;

          return (
            <li key={route.id} className="sm:w-64 sm:flex-none">
              {route.path === "/app/agents/[id]" ? (
                <div className="flex items-center justify-between rounded-2xl border border-dashed border-(--color-line) bg-(--color-panel-muted) px-4 py-3 text-sm">
                  <span>{route.title}</span>
                  <span className="font-mono text-xs text-(--color-muted)">
                    {route.path}
                  </span>
                </div>
              ) : (
                <Link
                  className={`flex items-center justify-between rounded-2xl border ${
                    isActive
                      ? "border-(--color-accent)"
                      : "border-(--color-line)"
                  } bg-(--color-panel-muted) px-4 py-3 text-sm hover:border-(--color-accent)`}
                  href={route.path as Route}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{route.title}</span>
                  <span className="font-mono text-xs text-(--color-muted)">
                    {route.path}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

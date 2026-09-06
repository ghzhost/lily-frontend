"use client";

import { EmptyState } from "@/components/ui/empty-state";

import { mockCultureValues, mockOpenRoles } from "./mock-roles";
import type { OpenRole } from "./types";

interface CareersContentProps {
  roles?: readonly OpenRole[];
}

export function CareersContent({ roles = mockOpenRoles }: CareersContentProps) {
  return (
    <div className="space-y-16">
      {/* Culture & Values Section */}
      <section aria-labelledby="culture-heading">
        <h2 id="culture-heading" className="text-2xl font-semibold tracking-tight text-(--color-ink)">
          Culture & Values
        </h2>
        <p className="mt-1 text-sm text-(--color-muted)">
          The operating principles that guide how we build, communicate, and collaborate.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {mockCultureValues.map((value) => (
            <div
              key={value.id}
              className="rounded-2xl border border-(--color-line) bg-(--color-panel) p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-(--color-ink)">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles Section */}
      <section aria-labelledby="open-roles-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h2 id="open-roles-heading" className="text-2xl font-semibold tracking-tight text-(--color-ink)">
              Open Opportunities
            </h2>
            <p className="mt-1 text-sm text-(--color-muted)">
              Explore our current vacancies across protocol engineering, frontend, and ecosystem growth.
            </p>
          </div>
          {roles.length > 0 && (
            <span className="rounded-full border border-(--color-line) bg-(--color-panel-muted) px-3 py-1 text-xs font-semibold text-(--color-accent)">
              {roles.length} {roles.length === 1 ? "role" : "roles"} open
            </span>
          )}
        </div>

        {roles.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              title="No Open Roles Currently"
              eyebrow="Talent Network"
              description="We do not have active listings at the moment, but we are always eager to connect with exceptional engineers and researchers."
              action={
                <a
                  href="mailto:careers@lillyprotocol.com?subject=General%20Application"
                  className="inline-flex items-center justify-center rounded-xl bg-(--color-accent) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  Send General Application
                </a>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-(--color-line) bg-(--color-panel) p-6 shadow-sm transition hover:border-(--color-accent) sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-(--color-ink)">{role.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-(--color-muted)">
                    <span>{role.team}</span>
                    <span aria-hidden="true">&bull;</span>
                    <span>{role.location}</span>
                    <span aria-hidden="true">&bull;</span>
                    <span className="rounded-md border border-(--color-line) px-2 py-0.5 text-xs">
                      {role.type}
                    </span>
                  </div>
                </div>

                <a
                  href={role.applyHref}
                  className="inline-flex items-center justify-center rounded-xl bg-(--color-accent) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 sm:w-auto"
                >
                  Apply Now &rarr;
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import type { RouteScaffold } from "@/types/site";

type PageScaffoldProps = {
  readonly route: RouteScaffold;
  readonly dynamicLabel?: string;
  readonly statusMessage?: string;
};

export function PageScaffold({
  route,
  dynamicLabel,
  statusMessage,
}: PageScaffoldProps) {
  return (
    <section className="surface rounded-[1.75rem] p-8 sm:p-10">
      <p className="eyebrow text-(--color-accent)">{route.section}</p>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] text-4xl font-semibold tracking-tight break-words">
            {route.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-(--color-muted) break-words">
            {route.purpose}
          </p>
        </div>
        <div className="rounded-2xl border border-(--color-line) bg-(--color-panel-muted) px-4 py-3 font-mono text-sm text-(--color-muted) break-all">
          {dynamicLabel ?? route.path}
        </div>
      </div>

      {statusMessage ? (
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3 text-sm text-[var(--color-muted)]"
        >
          {statusMessage}
        </p>
      ) : null}

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="min-w-0 rounded-3xl border border-(--color-line) bg-(--color-panel-muted) p-6">
          <h2 className="text-xl font-semibold">
            Contributor implementation note
          </h2>
          <p className="mt-3 text-base leading-7 text-(--color-muted)">
            This route is intentionally scaffolded. Contributors should
            implement the real experience from the approved Figma design rather
            than reuse removed demo content.
          </p>
          <p className="mt-4 text-base leading-7 text-(--color-muted)">
            {route.figmaScope}
          </p>
        </article>

        <article className="min-w-0 rounded-3xl border border-(--color-line) bg-(--color-panel-muted) p-6">
          <h2 className="text-xl font-semibold">Natural issue slices</h2>
          <ul className="mt-4 grid gap-3">
            {route.implementationAreas.map((area) => (
              <li
                key={area}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-solid)] px-4 py-3 text-sm text-[var(--color-muted)]"
              >
                {area}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}

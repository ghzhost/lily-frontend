import { coreValues, ecosystemHighlights, missionStatement } from "./about-data";

export function AboutContent() {
  return (
    <div className="space-y-16">
      {/* Mission Section */}
      <section aria-labelledby="mission-heading" className="rounded-3xl border border-(--color-line) bg-(--color-panel) p-8 shadow-sm sm:p-10">
        <p className="eyebrow text-(--color-accent)">Purpose & Vision</p>
        <h2 id="mission-heading" className="mt-2 text-2xl font-semibold tracking-tight text-(--color-ink) sm:text-3xl">
          Our Mission
        </h2>
        <p className="mt-4 text-xl leading-8 font-medium text-(--color-ink)">
          {missionStatement.headline}
        </p>
        <p className="mt-3 text-base leading-7 text-(--color-muted)">
          {missionStatement.lead}
        </p>
        <div className="mt-6 space-y-4 border-t border-(--color-line) pt-6 text-sm leading-relaxed text-(--color-muted)">
          {missionStatement.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-2xl font-semibold tracking-tight text-(--color-ink)">
          Core Values
        </h2>
        <p className="mt-1 text-sm text-(--color-muted)">
          Foundational tenets governing protocol design, software engineering, and community governance.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {coreValues.map((value) => (
            <div
              key={value.id}
              className="flex flex-col justify-between rounded-2xl border border-(--color-line) bg-(--color-panel) p-6 shadow-sm"
            >
              <div>
                <p className="text-lg font-semibold text-(--color-ink)">{value.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem & Credibility Section */}
      <section aria-labelledby="ecosystem-heading">
        <h2 id="ecosystem-heading" className="text-2xl font-semibold tracking-tight text-(--color-ink)">
          Ecosystem & Credibility
        </h2>
        <p className="mt-1 text-sm text-(--color-muted)">
          Supported by decentralized infrastructure providers, cryptographers, and an active contributor community.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {ecosystemHighlights.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-(--color-line) bg-(--color-panel-muted) p-6"
            >
              <span className="rounded-md border border-(--color-line) bg-(--color-panel) px-2.5 py-1 text-xs font-semibold text-(--color-accent)">
                {item.role}
              </span>
              <p className="mt-4 text-base font-semibold text-(--color-ink)">{item.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

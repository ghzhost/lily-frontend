import Link from 'next/link';

export default function AgentNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Agent not found
      </h1>
      <p className="max-w-md text-lg text-[var(--color-muted)]">
        The agent ID you requested does not exist or is no longer available. Please check the URL or
        browse the agents directory.
      </p>
      <Link
        href="/app/agents"
        className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-ink)] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Browse all agents
      </Link>
    </div>
  );
}

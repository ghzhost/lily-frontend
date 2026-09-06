import type { Metadata } from 'next';

import { getRouteScaffold } from '@/config/routes';
import { createScaffoldMetadata } from '@/features/scaffold/page-factory';
import { AgentsExplorer } from '@/features/agents/agents-explorer';
import { mockAgents } from '@/features/agents/mock-agents';

const scaffold = getRouteScaffold('agents');

export const metadata: Metadata = createScaffoldMetadata('agents');

export default function AgentsPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          {scaffold.title}
        </h1>
        <p className="mt-2 text-base text-[var(--color-muted)] sm:text-lg">{scaffold.purpose}</p>
      </div>

      <AgentsExplorer initialAgents={mockAgents} />
    </main>
  );
}

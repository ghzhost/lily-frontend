'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';

import { EmptyState } from '@/components/ui/empty-state';
import type { Agent, AgentStatus } from './types';

interface AgentsExplorerProps {
  readonly initialAgents: readonly Agent[];
}

const statusFilters: readonly { readonly label: string; readonly value: AgentStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Registered', value: 'registered' },
  { label: 'Paused', value: 'paused' },
];

function getStatusBadgeStyle(status: AgentStatus) {
  switch (status) {
    case 'active':
      return 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]';
    case 'registered':
      return 'border-[var(--color-line)] bg-[var(--color-panel-muted)] text-[var(--color-ink)]';
    case 'paused':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400';
  }
}

export function AgentsExplorer({ initialAgents }: AgentsExplorerProps) {
  const searchInputId = useId();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<AgentStatus | 'all'>('all');

  const filteredAgents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialAgents.filter((agent) => {
      const matchesStatus = selectedStatus === 'all' || agent.status === selectedStatus;
      const matchesQuery =
        q.length === 0 ||
        agent.name.toLowerCase().includes(q) ||
        agent.description.toLowerCase().includes(q) ||
        agent.id.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [initialAgents, searchQuery, selectedStatus]);

  function handleResetFilters() {
    setSearchQuery('');
    setSelectedStatus('all');
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <label htmlFor={searchInputId} className="sr-only">
            Search agents
          </label>
          <input
            id={searchInputId}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents by name or ID..."
            className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none"
          />
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by agent status"
        >
          {statusFilters.map(({ label, value }) => {
            const isSelected = selectedStatus === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedStatus(value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none ${
                  isSelected
                    ? 'bg-[var(--color-ink)] text-white'
                    : 'border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div role="status" aria-live="polite" className="text-xs text-[var(--color-muted)]">
        Showing {filteredAgents.length} of {initialAgents.length} agents
      </div>

      {filteredAgents.length === 0 ? (
        <EmptyState
          icon={<span className="text-xl">🔍</span>}
          title="No agents found"
          description={
            <p>
              No registered agents match your active filters. Try adjusting your search query or
              status selection.
            </p>
          }
          action={
            <button
              type="button"
              onClick={handleResetFilters}
              className="rounded-full bg-[var(--color-ink)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredAgents.map((agent) => (
            <article
              key={agent.id}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all hover:border-[var(--color-accent)]"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
                    <Link
                      href={`/app/agents/${agent.id}`}
                      className="focus-visible:underline focus-visible:outline-none"
                    >
                      {agent.name}
                    </Link>
                  </h2>
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold capitalize ${getStatusBadgeStyle(
                      agent.status,
                    )}`}
                  >
                    {agent.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {agent.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-line)] pt-4 text-xs text-[var(--color-muted)]">
                <span className="font-mono">{agent.id}</span>
                <span>{agent.tasksCompleted.toLocaleString()} tasks</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

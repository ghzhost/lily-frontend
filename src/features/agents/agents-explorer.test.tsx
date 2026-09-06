import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AgentsExplorer } from './agents-explorer';
import { mockAgents } from './mock-agents';

describe('AgentsExplorer', () => {
  it('renders all initial agents with names, statuses, and links', () => {
    render(<AgentsExplorer initialAgents={mockAgents} />);

    expect(screen.getByText('Showing 6 of 6 agents')).toBeInTheDocument();
    for (const agent of mockAgents) {
      expect(screen.getByRole('link', { name: agent.name })).toHaveAttribute(
        'href',
        `/app/agents/${agent.id}`,
      );
      expect(screen.getByText(agent.id)).toBeInTheDocument();
    }
  });

  it('filters agents by text search query', () => {
    render(<AgentsExplorer initialAgents={mockAgents} />);

    const searchInput = screen.getByPlaceholderText(/search agents/i);
    fireEvent.change(searchInput, { target: { value: 'sentinel' } });

    expect(screen.getByText('Showing 1 of 6 agents')).toBeInTheDocument();
    expect(screen.getByText('Lily Core Sentinel')).toBeInTheDocument();
    expect(screen.queryByText('Shield Auditor')).not.toBeInTheDocument();
  });

  it('filters agents by status button selection', () => {
    render(<AgentsExplorer initialAgents={mockAgents} />);

    const pausedButton = screen.getByRole('button', { name: /^paused$/i });
    fireEvent.click(pausedButton);

    expect(pausedButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing 1 of 6 agents')).toBeInTheDocument();
    expect(screen.getByText('Ecosystem Bridge Oracle')).toBeInTheDocument();
    expect(screen.queryByText('Lily Core Sentinel')).not.toBeInTheDocument();
  });

  it('displays EmptyState when no agents match and resets on Clear filters click', () => {
    render(<AgentsExplorer initialAgents={mockAgents} />);

    const searchInput = screen.getByPlaceholderText(/search agents/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent-agent-xyz' } });

    expect(screen.getByText('Showing 0 of 6 agents')).toBeInTheDocument();
    expect(screen.getByText('No agents found')).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearButton);

    expect(screen.getByText('Showing 6 of 6 agents')).toBeInTheDocument();
    expect(screen.getByText('Lily Core Sentinel')).toBeInTheDocument();
  });
});

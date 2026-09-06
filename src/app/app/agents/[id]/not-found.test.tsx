import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AgentNotFound from './not-found';

describe('AgentNotFound', () => {
  it('renders agent not found message with link to agents directory', () => {
    render(<AgentNotFound />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /agent not found/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain('text-[var(--color-ink)]');
    expect(heading.className).not.toContain('slate');
    expect(heading.className).not.toContain('dark:');

    const link = screen.getByRole('link', { name: /browse all agents/i });
    expect(link).toHaveAttribute('href', '/app/agents');
    expect(link.className).toContain('bg-[var(--color-ink)]');
    expect(link.className).toContain('focus-visible:ring-[var(--color-accent)]');
    expect(link.className).not.toContain('slate');
    expect(link.className).not.toContain('dark:');
  });
});

import { render, screen } from '@testing-library/react';

import { routeScaffolds } from '@/config/routes';
import { createScaffoldPage } from './page-factory';

function expectSingleHeading(title: string) {
  const headings = screen.getAllByRole('heading', { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0]).toHaveTextContent(title);
}

describe('createScaffoldPage', () => {
  it('creates a route-specific scaffold component', () => {
    const DocsPage = createScaffoldPage('docs');

    render(<DocsPage />);

    expect(screen.getByRole('heading', { level: 1, name: /documentation/i })).toBeInTheDocument();
  });

  it.each(routeScaffolds)("renders one h1 for $id", (route) => {
    const ScaffoldPage = createScaffoldPage(route.id);

    render(<ScaffoldPage />);

    expectSingleHeading(route.title);
  });
});

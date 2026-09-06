import { render, screen } from '@testing-library/react';

import { getRouteScaffold } from '@/config/routes';

import { PageScaffold } from './page-scaffold';

describe('PageScaffold', () => {
  it('renders implementation guidance for a scaffolded route', () => {
    render(<PageScaffold route={getRouteScaffold('landing')} />);

    expect(screen.getByRole('heading', { level: 1, name: /landing page/i })).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /landing page/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("/")).toBeInTheDocument();
    expect(
      screen.getByText(
        /contributors should implement the real experience from the approved figma design/i,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("announces a provided status message politely", () => {
    render(
      <PageScaffold
        route={getRouteScaffold("agents")}
        statusMessage="Loading agents..."
      />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Loading agents...");
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("status")).toHaveAttribute("aria-atomic", "true");
  });

  it("renders the route section eyebrow and title", () => {
    const route = getRouteScaffold("agent-detail");

    render(<PageScaffold route={route} />);

    expect(screen.getByText(route.section)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: route.title }),
    ).toBeInTheDocument();
  });

  it("renders a custom dynamic label instead of the route path", () => {
    const route = getRouteScaffold("agent-detail");
    const dynamicLabel = "Agent 123";

    render(<PageScaffold route={route} dynamicLabel={dynamicLabel} />);

    expect(screen.getByText(dynamicLabel)).toBeInTheDocument();
    expect(screen.queryByText(route.path)).not.toBeInTheDocument();
  });

  it("renders the figmaScope paragraph exactly once within the implementation-note article", () => {
    const route = getRouteScaffold("landing");

    render(<PageScaffold route={route} />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /contributor implementation note/i,
    });
    const article = heading.closest("article");
    expect(article).not.toBeNull();

    const scopeParagraphs = screen.getAllByText(route.figmaScope);
    expect(scopeParagraphs).toHaveLength(1);
    expect(article).toContainElement(scopeParagraphs[0]);
  });
});


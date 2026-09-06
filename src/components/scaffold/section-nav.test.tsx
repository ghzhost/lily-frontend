import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SectionNav } from "./section-nav";

import type { ComponentProps } from "react";
import type { RouteScaffold } from "@/types/site";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    "aria-current": ariaCurrent,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    "aria-current"?: ComponentProps<"a">["aria-current"];
  }) => (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  ),
}));

const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

const mockRoutes: readonly RouteScaffold[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    section: "marketing",
    purpose: "Home page",
    figmaScope: "Home screen",
    implementationAreas: ["UI"],
  },
  {
    id: "about",
    title: "About",
    path: "/about",
    section: "marketing",
    purpose: "About page",
    figmaScope: "About screen",
    implementationAreas: ["UI"],
  },
  {
    id: "agent-detail",
    title: "Agent Detail",
    path: "/app/agents/[id]",
    section: "dashboard",
    purpose: "Agent details",
    figmaScope: "Agent screen",
    implementationAreas: ["UI"],
  },
];

describe("SectionNav", () => {
  it("marks link as active when pathname matches exactly", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<SectionNav routes={mockRoutes} />);
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toHaveAttribute("aria-current", "page");
    expect(aboutLink.className).toContain("border-(--color-accent)");
  });

  it("does not mark links as active on unrelated path", () => {
    mockUsePathname.mockReturnValue("/contact");
    render(<SectionNav routes={mockRoutes} />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).not.toHaveAttribute("aria-current");
  });

  it("renders placeholder div for dynamic route pattern", () => {
    mockUsePathname.mockReturnValue("/app/agents/123");
    render(<SectionNav routes={mockRoutes} />);
    expect(screen.queryByRole("link", { name: /agent detail/i })).toBeNull();
    expect(screen.getByText("Agent Detail")).toBeInTheDocument();
  });

  it("renders default aria-label 'Section routes' when ariaLabel is not provided", () => {
    mockUsePathname.mockReturnValue("/");
    render(<SectionNav routes={mockRoutes} />);
    const nav = screen.getByRole("navigation", { name: "Section routes" });
    expect(nav).toBeInTheDocument();
  });

  it("renders custom aria-label when ariaLabel prop is provided", () => {
    mockUsePathname.mockReturnValue("/");
    render(
      <SectionNav
        routes={mockRoutes}
        ariaLabel="Support and legal pages"
      />,
    );
    const nav = screen.getByRole("navigation", {
      name: "Support and legal pages",
    });
    expect(nav).toBeInTheDocument();
  });
});

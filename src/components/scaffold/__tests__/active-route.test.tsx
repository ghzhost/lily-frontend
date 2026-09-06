import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { SiteHeader } from "../site-header";
import { SectionNav } from "../section-nav";
import type { RouteScaffold } from "@/types/site";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const mockUsePathname = vi.mocked(
  (await import("next/navigation")).usePathname
);

describe("Active route indication (Issue #119)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("SiteHeader", () => {
    it("marks home link as active on root path", () => {
      mockUsePathname.mockReturnValue("/");
      render(<SiteHeader />);
      const homeLink = screen.getByRole("link", { name: /lily/i });
      expect(homeLink).toHaveAttribute("aria-current", "page");
    });

    it("does not mark home link as active on nested paths", () => {
      mockUsePathname.mockReturnValue("/docs/getting-started");
      render(<SiteHeader />);
      const homeLink = screen.getByRole("link", { name: /lily/i });
      expect(homeLink).not.toHaveAttribute("aria-current");
    });

    it("marks docs link as active for exact and nested matches", () => {
      mockUsePathname.mockReturnValue("/docs/api");
      render(<SiteHeader />);
      const docsLink = screen.getByRole("link", { name: /^docs$/i });
      expect(docsLink).toHaveAttribute("aria-current", "page");
    });
  });

  describe("SectionNav", () => {
    const routes: readonly RouteScaffold[] = [
      { id: "home", title: "Home", path: "/", section: "marketing", purpose: "Home", figmaScope: "", implementationAreas: [] },
      { id: "docs", title: "Docs", path: "/docs", section: "docs", purpose: "Docs", figmaScope: "", implementationAreas: [] },
      { id: "agent-detail", title: "Agent Detail", path: "/app/agents/[id]", section: "dashboard", purpose: "Detail", figmaScope: "", implementationAreas: [] },
    ];

    it("applies aria-current to exact match", () => {
      mockUsePathname.mockReturnValue("/docs");
      render(<SectionNav routes={routes} />);
      const docsLink = screen.getByRole("link", { name: /docs/i });
      expect(docsLink).toHaveAttribute("aria-current", "page");
    });

    it("applies aria-current to nested match", () => {
      mockUsePathname.mockReturnValue("/docs/installation");
      render(<SectionNav routes={routes} />);
      const docsLink = screen.getByRole("link", { name: /docs/i });
      expect(docsLink).toHaveAttribute("aria-current", "page");
    });

    it("does not apply aria-current to non-matching routes", () => {
      mockUsePathname.mockReturnValue("/about");
      render(<SectionNav routes={routes} />);
      const docsLink = screen.getByRole("link", { name: /docs/i });
      expect(docsLink).not.toHaveAttribute("aria-current");
    });

    it("never applies aria-current to dynamic placeholder div", () => {
      mockUsePathname.mockReturnValue("/app/agents/123");
      render(<SectionNav routes={routes} />);
      const placeholder = screen.getByText("/app/agents/[id]");
      expect(placeholder.tagName).toBe("SPAN");
      expect(placeholder.closest("[aria-current]")).toBeNull();
    });
  });
});

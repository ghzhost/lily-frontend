import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { getSectionRoutes } from "@/config/routes";
import { SectionNav } from "./section-nav";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/docs",
}));

describe("Active Route Indication (aria-current)", () => {
  describe("SiteHeader", () => {
    it("marks active route link with aria-current='page'", () => {
      render(<SiteHeader />);
      const docsLink = screen.getByRole("link", { name: /^docs$/i });
      expect(docsLink).toHaveAttribute("aria-current", "page");

      const signinLink = screen.getByRole("link", { name: /^sign in$/i });
      expect(signinLink).not.toHaveAttribute("aria-current");
    });
  });

  describe("SectionNav", () => {
    it("marks active section route link with aria-current='page'", () => {
      const routes = getSectionRoutes("docs");
      render(<SectionNav routes={routes} />);

      const docsLink = screen.getByRole("link", { name: /documentation/i });
      expect(docsLink).toHaveAttribute("aria-current", "page");

      const statusLink = screen.getByRole("link", { name: /status page/i });
      expect(statusLink).not.toHaveAttribute("aria-current");
    });

    it("never applies aria-current to dynamic placeholder div", () => {
      const routes = getSectionRoutes("dashboard");
      render(<SectionNav routes={routes} />);
      const placeholder = screen.getByText("/app/agents/[id]");
      expect(placeholder.closest("[aria-current]")).toBeNull();
    });
  });
});

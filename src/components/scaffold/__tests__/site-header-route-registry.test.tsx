import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SiteHeader } from "../site-header";
import { routeScaffolds } from "@/config/routes";

describe("SiteHeader Route Registry Sync", () => {
  it("renders all expected navigation links from site config", () => {
    render(<SiteHeader />);
    
    const docsLink = screen.getByRole("link", { name: /docs/i });
    const signInLink = screen.getByRole("link", { name: /sign in/i });
    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    
    expect(docsLink).toBeInTheDocument();
    expect(signInLink).toBeInTheDocument();
    expect(dashboardLink).toBeInTheDocument();
    
    expect(docsLink).toHaveAttribute("href", "/docs");
    expect(signInLink).toHaveAttribute("href", "/signin");
    expect(dashboardLink).toHaveAttribute("href", "/app");
  });

  it("contains no dead links (all hrefs map to registered routes)", () => {
    render(<SiteHeader />);
    
    const links = screen.getAllByRole("link");
    const registeredPaths = new Set<string>(routeScaffolds.map((r) => r.path));
    registeredPaths.add("/");
    
    for (const link of links) {
      const href = link.getAttribute("href");
      if (href && href.startsWith("/")) {
        expect(registeredPaths.has(href)).toBe(true);
      }
    }
  });

  it("does not contain duplicate navigation entries", () => {
    render(<SiteHeader />);
    
    const nav = screen.getByRole("navigation", { name: /global/i });
    const links = nav.querySelectorAll("a");
    const hrefs = Array.from(links).map((l) => l.getAttribute("href"));
    const uniqueHrefs = new Set(hrefs);
    
    expect(hrefs.length).toBe(uniqueHrefs.size);
  });
});

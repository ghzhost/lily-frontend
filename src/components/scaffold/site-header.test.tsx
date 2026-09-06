import { fireEvent, render, screen } from "@testing-library/react";

import { routes, siteConfig } from "@/config/site";
import { routeScaffolds } from "@/config/routes";

import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("renders site branding and links to home", () => {
    render(<SiteHeader />);

    const brandLink = screen.getByRole("link", { name: new RegExp(siteConfig.name, "i") });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute("href", routes.home);
  });

  it("renders global navigation links matching the route registry", () => {
    render(<SiteHeader />);

    const docsLink = screen.getByRole("link", { name: /^docs$/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute("href", routes.docs);

    const signinLink = screen.getByRole("link", { name: /^sign in$/i });
    expect(signinLink).toBeInTheDocument();
    expect(signinLink).toHaveAttribute("href", routes.signin);

    const dashboardLink = screen.getByRole("link", { name: /^dashboard$/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", routes.dashboard);
  });

  it("contains no dead or unregistered links", () => {
    render(<SiteHeader />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);

    const registeredPaths = new Set<string>(routeScaffolds.map((r) => r.path));

    for (const link of links) {
      const href = link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(registeredPaths.has(href!)).toBe(true);
    }
  });

  it("renders one mobile menu and closes it on Escape", () => {
    render(<SiteHeader />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(document.querySelectorAll("#mobile-nav-menu")).toHaveLength(1);
    expect(
      screen.getByRole("navigation", { name: "Mobile" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
    expect(menuButton).toHaveFocus();
  });
});

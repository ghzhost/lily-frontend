import { render, screen } from "@testing-library/react";

import { routeScaffolds } from "@/config/routes";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  const legalRoutes = routeScaffolds.filter((route) => route.section === "legal");
  const supportRoutes = routeScaffolds.filter(
    (route) => route.section === "docs",
  );

  it("renders the brand mark linking home", () => {
    render(<SiteFooter legalRoutes={legalRoutes} supportRoutes={supportRoutes} />);

    const brand = screen.getByRole("link", { name: /lily protocol/i });
    expect(brand).toHaveAttribute("href", "/");
  });

  it("renders every legal route as a footer link", () => {
    render(<SiteFooter legalRoutes={legalRoutes} supportRoutes={supportRoutes} />);

    for (const route of legalRoutes) {
      const link = screen.getByRole("link", { name: route.title });
      expect(link).toHaveAttribute("href", route.path);
    }
  });

  it("renders every support route as a footer link", () => {
    render(<SiteFooter legalRoutes={legalRoutes} supportRoutes={supportRoutes} />);

    for (const route of supportRoutes) {
      const link = screen.getByRole("link", { name: route.title });
      expect(link).toHaveAttribute("href", route.path);
    }
  });

  it("displays a copyright line with current year", () => {
    render(<SiteFooter legalRoutes={legalRoutes} supportRoutes={supportRoutes} />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});

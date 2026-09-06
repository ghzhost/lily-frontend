import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

describe("Route group layout smoke tests", () => {
  it("marketing layout renders section structure with nav and aside", async () => {
    const Layout = (await import("@/app/(marketing)/layout")).default;
    render(<Layout><div data-testid="child">Marketing Page</div></Layout>);
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(document.querySelector("aside")).toBeTruthy();
    expect(screen.getAllByRole("navigation").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("auth layout renders section structure with nav and aside", async () => {
    const Layout = (await import("@/app/(auth)/layout")).default;
    render(<Layout><div data-testid="child">Auth Page</div></Layout>);
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(document.querySelector("aside")).toBeTruthy();
    expect(screen.getAllByRole("navigation").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("support layout renders combined docs/legal section structure", async () => {
    const Layout = (await import("@/app/(support)/layout")).default;
    render(<Layout><div data-testid="child">Support Page</div></Layout>);
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(document.querySelector("aside")).toBeTruthy();
    expect(screen.getAllByRole("navigation").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("dashboard app layout renders section wrapper with nav and aside", async () => {
    const Layout = (await import("@/app/app/layout")).default;
    render(<Layout><div data-testid="child">Dashboard Page</div></Layout>);
    
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(document.querySelector("aside")).toBeTruthy();
    expect(screen.getAllByRole("navigation").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});

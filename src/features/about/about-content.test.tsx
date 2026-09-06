import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage, { metadata } from "@/app/(marketing)/about/page";
import { AboutContent } from "@/features/about/about-content";

describe("About Page & Content", () => {
  it("exports metadata whose canonical URL is https://lilyprotocol.dev/about", () => {
    expect(metadata.alternates?.canonical).toBe("https://lilyprotocol.dev/about");
  });

  it("renders a single h1 heading on the page", () => {
    render(<AboutPage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/about lily protocol/i);
  });

  it("enforces logical heading hierarchy containing only h1 and h2", () => {
    const { container } = render(<AboutPage />);
    const h3s = container.querySelectorAll("h3");
    const h4s = container.querySelectorAll("h4");
    const h5s = container.querySelectorAll("h5");
    const h6s = container.querySelectorAll("h6");

    expect(h3s).toHaveLength(0);
    expect(h4s).toHaveLength(0);
    expect(h5s).toHaveLength(0);
    expect(h6s).toHaveLength(0);

    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThanOrEqual(3);
  });

  it("renders all named sections (mission, values, ecosystem)", () => {
    render(<AboutContent />);
    expect(screen.getByRole("heading", { name: /our mission/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /core values/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ecosystem & credibility/i })).toBeInTheDocument();
  });

  it("does not render any nested main landmarks", () => {
    const { container } = render(<AboutPage />);
    expect(container.querySelectorAll("main")).toHaveLength(0);
  });
});

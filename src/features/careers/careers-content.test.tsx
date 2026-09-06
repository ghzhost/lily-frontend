import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CareersPage from "@/app/(marketing)/careers/page";
import { CareersContent } from "@/features/careers/careers-content";
import { mockCultureValues, mockOpenRoles } from "@/features/careers/mock-roles";

describe("Careers Page & Content", () => {
  it("renders exactly one h1 heading on the careers page", () => {
    render(<CareersPage />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/careers at lily protocol/i);
  });

  it("renders all culture and values sections", () => {
    render(<CareersContent />);

    for (const val of mockCultureValues) {
      expect(screen.getByText(val.title)).toBeInTheDocument();
      expect(screen.getByText(val.description)).toBeInTheDocument();
    }
  });

  it("renders the list of open roles from mock data", () => {
    render(<CareersContent />);

    for (const role of mockOpenRoles) {
      expect(screen.getByText(role.title)).toBeInTheDocument();
      expect(screen.getByText(role.team)).toBeInTheDocument();
    }

    const applyLinks = screen.getAllByRole("link", { name: /apply now/i });
    expect(applyLinks).toHaveLength(mockOpenRoles.length);
    expect(applyLinks[0]).toHaveAttribute("href", mockOpenRoles[0].applyHref);
  });

  it("renders the EmptyState component when roles array is empty", () => {
    render(<CareersContent roles={[]} />);

    expect(screen.getByText(/no open roles currently/i)).toBeInTheDocument();
    expect(
      screen.getByText(/we do not have active listings at the moment/i)
    ).toBeInTheDocument();

    const generalApplyLink = screen.getByRole("link", { name: /send general application/i });
    expect(generalApplyLink).toHaveAttribute("href", expect.stringContaining("mailto:careers@lillyprotocol.com"));

    // Open roles should not be rendered
    expect(screen.queryByRole("link", { name: /apply now/i })).not.toBeInTheDocument();
  });
});

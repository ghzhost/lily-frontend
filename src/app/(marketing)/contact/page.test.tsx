import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ContactPage from "./page";

describe("ContactPage", () => {
  it("renders exactly one h1 and one form landmark", () => {
    render(<ContactPage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Contact");

    const formElements = document.querySelectorAll("form");
    expect(formElements).toHaveLength(1);
  });

  it("renders support, security, and community channel cards with links", () => {
    render(<ContactPage />);

    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();

    const supportLink = screen.getByRole("link", {
      name: "support@lilyprotocol.dev",
    });
    expect(supportLink).toHaveAttribute("href", "mailto:support@lilyprotocol.dev");

    const securityLink = screen.getByRole("link", {
      name: "security@lilyprotocol.dev",
    });
    expect(securityLink).toHaveAttribute("href", "mailto:security@lilyprotocol.dev");

    const communityLink = screen.getByRole("link", {
      name: "community@lilyprotocol.dev",
    });
    expect(communityLink).toHaveAttribute(
      "href",
      "mailto:community@lilyprotocol.dev",
    );
  });

  it("submits an empty form and displays validation errors without navigating", async () => {
    render(<ContactPage />);

    const submitButton = screen.getByRole("button", { name: /submit inquiry/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Subject is required")).toBeInTheDocument();
      expect(screen.getByText("Message is required")).toBeInTheDocument();
    });
  });

  it("validates invalid email address format", async () => {
    render(<ContactPage />);

    await userEvent.type(screen.getByLabelText("Name"), "Alice");
    await userEvent.type(screen.getByLabelText("Email"), "not-an-email");
    await userEvent.type(screen.getByLabelText("Subject"), "Help");
    await userEvent.type(
      screen.getByLabelText("Message"),
      "Need help with integration",
    );

    await userEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("toggles FAQ accordion panels on click", async () => {
    render(<ContactPage />);

    const faqButton = screen.getByRole("button", {
      name: /how quickly does the team respond to inquiries/i,
    });
    expect(faqButton).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(faqButton);
    expect(faqButton).toHaveAttribute("aria-expanded", "true");

    expect(
      screen.getByText(/we monitor channels during regular business hours/i),
    ).toBeInTheDocument();
  });
});

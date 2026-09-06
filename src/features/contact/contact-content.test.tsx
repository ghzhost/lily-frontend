import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContactPage from "@/app/(marketing)/contact/page";
import { ContactContent } from "@/features/contact/contact-content";
import { contactChannels, faqItems } from "@/features/contact/contact-data";

describe("Contact Page & Content", () => {
  it("renders exactly one h1 heading on the contact page", () => {
    render(<ContactPage />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/contact us/i);
  });

  it("renders exactly one form landmark on the page initially", () => {
    const { container } = render(<ContactContent />);
    const forms = container.querySelectorAll("form");
    expect(forms).toHaveLength(1);
  });

  it("renders all inbound contact channel cards with expected links", () => {
    render(<ContactContent />);

    for (const channel of contactChannels) {
      expect(screen.getByText(channel.title)).toBeInTheDocument();
      const link = screen.getByRole("link", { name: new RegExp(channel.actionLabel, "i") });
      expect(link).toHaveAttribute("href", channel.href);
    }
  });

  it("displays validation error alerts on empty form submission and does not navigate", () => {
    render(<ContactContent />);

    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });
    fireEvent.click(submitBtn);

    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();

    // Form remains in document (no submission / navigation)
    expect(screen.getByRole("button", { name: /submit inquiry/i })).toBeInTheDocument();
  });

  it("validates email formatting", () => {
    render(<ContactContent />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Satoshi Nakamoto" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Hello Lily" } });

    fireEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it("displays success confirmation upon valid submission", () => {
    render(<ContactContent />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Alice Cooper" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Looking forward to integrating." } });

    fireEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/message received/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /submit inquiry/i })).not.toBeInTheDocument();
  });

  it("toggles accordion FAQ items correctly", () => {
    render(<ContactContent />);

    const firstFaq = faqItems[0];
    const button = screen.getByRole("button", { name: new RegExp(firstFaq.question, "i") });

    // Initially collapsed
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Click to expand
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    // Click again to collapse
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

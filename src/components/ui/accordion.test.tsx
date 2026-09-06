import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion, AccordionItem } from "./accordion";

vi.mock("next/link", () => ({ default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} /> }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("AccordionItem", () => {
  it("renders with title and collapsed content by default", () => {
    render(
      <Accordion>
        <AccordionItem title="Test Question">Answer content</AccordionItem>
      </Accordion>
    );

    const button = screen.getByRole("button", { name: /test question/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    
    const panel = screen.getByRole("region", { name: /test question/i });
    expect(panel).toHaveStyle({ height: "0px" });
  });

  it("expands content when clicked and updates aria attributes", () => {
    render(
      <Accordion>
        <AccordionItem title="Toggle Me">Hidden answer</AccordionItem>
      </Accordion>
    );

    const button = screen.getByRole("button", { name: /toggle me/i });
    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("region", { name: /toggle me/i });
    expect(panel).toBeInTheDocument();
  });

  it("supports keyboard interaction (Enter key)", () => {
    render(
      <Accordion>
        <AccordionItem title="Keyboard Test">Content</AccordionItem>
      </Accordion>
    );

    const button = screen.getByRole("button", { name: /keyboard test/i });
    fireEvent.keyDown(button, { key: "Enter" });

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("respects defaultOpen prop", () => {
    render(
      <Accordion>
        <AccordionItem title="Open Default" defaultOpen>Visible immediately</AccordionItem>
      </Accordion>
    );

    const button = screen.getByRole("button", { name: /open default/i });
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("does not reference undefined CSS variables", () => {
    const { container } = render(
      <Accordion>
        <AccordionItem title="CSS Token Test" defaultOpen>
          Content
        </AccordionItem>
      </Accordion>
    );

    const html = container.innerHTML;
    expect(html).not.toContain("--color-border");
    expect(html).not.toContain("--color-muted-foreground");
    expect(html).toContain("--color-line");
    expect(html).toContain("--color-muted");
    expect(html).toContain("--color-ink");
  });
});

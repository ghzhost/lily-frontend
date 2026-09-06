import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Timeline, TimelineItem } from "./timeline";

const items = [
  {
    date: "2026-08-25",
    title: "v0.1.0 Foundation Release",
    description: "Initial stable architecture and quality pipeline.",
    status: "released",
  },
  {
    date: "2026-08-20",
    title: "Design System Tokens",
    description: "Color palette and typography integration.",
    status: "completed",
  },
  {
    date: "2026-08-15",
    title: "Contract Interface Draft",
    description: "Drafting the canonical contract interfaces.",
    status: "in-progress",
  },
] as const;

function renderTimeline() {
  return render(
    <Timeline>
      {items.map((item) => (
        <TimelineItem
          key={item.title}
          date={item.date}
          title={item.title}
          status={item.status}
        >
          {item.description}
        </TimelineItem>
      ))}
    </Timeline>,
  );
}

describe("Timeline Component", () => {
  it("renders all timeline items with date, title, and description", () => {
    renderTimeline();

    expect(screen.getByText("v0.1.0 Foundation Release")).toBeInTheDocument();
    expect(screen.getByText("Design System Tokens")).toBeInTheDocument();
    expect(screen.getByText("Contract Interface Draft")).toBeInTheDocument();

    expect(screen.getByText("2026-08-25")).toBeInTheDocument();
    expect(
      screen.getByText("Initial stable architecture and quality pipeline."),
    ).toBeInTheDocument();
  });

  it("renders status badges", () => {
    renderTimeline();

    expect(screen.getByText("released")).toBeInTheDocument();
    expect(screen.getByText("completed")).toBeInTheDocument();
    expect(screen.getByText("in-progress")).toBeInTheDocument();
  });

  it("connects items with a line and omits it on the last item", () => {
    renderTimeline();

    const lines = screen.getAllByTestId("timeline-line");
    // With 3 items, there should be exactly 2 connecting lines between them.
    expect(lines).toHaveLength(2);

    const lastItem = screen.getByText("Contract Interface Draft").closest("li");
    expect(lastItem).not.toBeNull();
    expect(within(lastItem!).queryByTestId("timeline-line")).not.toBeInTheDocument();
  });

  it("renders an ordered list and an empty timeline without crash", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem date="2026-08-25" title="Only item">
          {" "}
        </TimelineItem>
      </Timeline>,
    );
    expect(container.querySelector("ol")).toBeInTheDocument();

    const empty = render(<Timeline>{null}</Timeline>).container;
    const list = empty.querySelector("ol");
    expect(list).toBeInTheDocument();
    expect(list?.children).toHaveLength(0);
  });
});

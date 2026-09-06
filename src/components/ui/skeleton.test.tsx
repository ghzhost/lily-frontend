import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton, SkeletonText, SkeletonCard } from "./skeleton";

describe("Skeleton", () => {
  it("renders default skeleton with aria-hidden", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el.className).toContain("animate-pulse");
  });

  it("renders text variant with correct height", () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass("h-4");
  });

  it("renders avatar variant as circle", () => {
    const { container } = render(<Skeleton variant="avatar" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("respects motion-reduce via class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("motion-reduce:animate-none");
  });
});

describe("SkeletonText", () => {
  it("renders specified number of lines", () => {
    const { container } = render(<SkeletonText lines={4} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(4);
  });

  it("defaults to 3 lines", () => {
    const { container } = render(<SkeletonText />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
  });
});

describe("SkeletonCard", () => {
  it("renders avatar and text placeholders", () => {
    const { container } = render(<SkeletonCard />);
    const skeletons = container.querySelectorAll('[aria-hidden="true"]');
    expect(skeletons.length).toBeGreaterThan(3);
  });
});

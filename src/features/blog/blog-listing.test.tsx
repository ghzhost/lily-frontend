import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BlogPage from "@/app/(marketing)/blog/page";
import { BlogListing } from "@/features/blog/blog-listing";
import { mockBlogPosts } from "@/features/blog/blog-data";

describe("Blog Page & Listing", () => {
  it("renders a single h1 heading on the blog page", () => {
    render(<BlogPage />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/lily protocol blog/i);
  });

  it("renders featured post and ensures each post links to a stable href", () => {
    render(<BlogListing />);

    const featured = mockBlogPosts.find((p) => p.featured);
    if (featured) {
      expect(screen.getByRole("heading", { name: featured.title })).toBeInTheDocument();
    }

    for (const post of mockBlogPosts) {
      const links = screen.getAllByRole("link", { name: new RegExp(post.title, "i") });
      expect(links.length).toBeGreaterThanOrEqual(1);
      expect(links[0]).toHaveAttribute("href", `/blog/${post.slug}`);
    }
  });

  it("filters visible articles when clicking a category button", () => {
    render(<BlogListing />);

    const productBtn = screen.getByRole("button", { name: /^product$/i });
    fireEvent.click(productBtn);

    expect(productBtn).toHaveAttribute("aria-pressed", "true");

    const engineeringPosts = mockBlogPosts.filter((p) => p.category === "Engineering");
    for (const ep of engineeringPosts) {
      expect(screen.queryByRole("link", { name: ep.title })).not.toBeInTheDocument();
    }

    const productPosts = mockBlogPosts.filter((p) => p.category === "Product");
    for (const pp of productPosts) {
      expect(screen.getByRole("link", { name: pp.title })).toBeInTheDocument();
    }
  });

  it("renders the EmptyState component when category has no matching articles", () => {
    render(<BlogListing />);

    const researchBtn = screen.getByRole("button", { name: /^research$/i });
    fireEvent.click(researchBtn);

    expect(screen.getByText(/no articles found in "research"/i)).toBeInTheDocument();
    expect(
      screen.getByText(/we haven't published articles in this category yet/i)
    ).toBeInTheDocument();

    const resetBtn = screen.getByRole("button", { name: /view all articles/i });
    expect(resetBtn).toBeInTheDocument();

    // Clicking reset returns to All
    fireEvent.click(resetBtn);
    expect(screen.queryByText(/no articles found/i)).not.toBeInTheDocument();
  });
});

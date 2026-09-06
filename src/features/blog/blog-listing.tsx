"use client";

import Link from "next/link";
import { useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";

import { blogCategories, mockBlogPosts, type BlogCategory, type BlogPost } from "./blog-data";

interface BlogListingProps {
  posts?: readonly BlogPost[];
}

export function BlogListing({ posts = mockBlogPosts }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");

  const featuredPost = posts.find((p) => p.featured) ?? posts[0];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const showFeatured =
    featuredPost && (selectedCategory === "All" || featuredPost.category === selectedCategory);

  const gridPosts = showFeatured
    ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter posts by category">
        {blogCategories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedCategory(category)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition",
                isActive
                  ? "bg-(--color-accent) text-white shadow-sm"
                  : "border border-(--color-line) bg-(--color-panel) text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-ink)",
              ].join(" ")}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Featured Post */}
      {showFeatured && (
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="sr-only">
            Featured Article
          </h2>
          <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-(--color-line) bg-(--color-panel) p-8 shadow-sm transition hover:border-(--color-accent) sm:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-(--color-line) bg-(--color-panel-muted) px-2.5 py-0.5 text-xs font-semibold text-(--color-accent)">
                  Featured
                </span>
                <span className="text-xs font-medium text-(--color-muted)">{featuredPost.category}</span>
                <span aria-hidden="true" className="text-(--color-muted)">&bull;</span>
                <span className="text-xs text-(--color-muted)">{featuredPost.readTime}</span>
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-(--color-ink) sm:text-3xl">
                <Link href={`/blog/${featuredPost.slug}`} className="hover:underline focus:outline-none">
                  {featuredPost.title}
                </Link>
              </h3>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-(--color-muted)">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-(--color-line) pt-6 text-sm text-(--color-muted)">
              <time dateTime={featuredPost.date}>{featuredPost.date}</time>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="font-medium text-(--color-accent) hover:underline"
              >
                Read article &rarr;
              </Link>
            </div>
          </article>
        </section>
      )}

      {/* Posts Grid or Empty State */}
      <section aria-labelledby="posts-grid-heading">
        <h2 id="posts-grid-heading" className="text-2xl font-semibold tracking-tight text-(--color-ink)">
          {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
        </h2>

        {gridPosts.length === 0 && !showFeatured ? (
          <div className="mt-8">
            <EmptyState
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              }
              title={`No articles found in "${selectedCategory}"`}
              eyebrow="Knowledge Base"
              description="We haven't published articles in this category yet. Check back soon or browse all available articles."
              action={
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="inline-flex items-center justify-center rounded-xl bg-(--color-accent) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  View All Articles
                </button>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between rounded-2xl border border-(--color-line) bg-(--color-panel) p-6 shadow-sm transition hover:border-(--color-accent)"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-(--color-muted)">
                    <span className="font-medium text-(--color-accent)">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-(--color-ink)">
                    <Link href={`/blog/${post.slug}`} className="hover:underline focus:outline-none">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">{post.excerpt}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-(--color-line) pt-4 text-xs text-(--color-muted)">
                  <time dateTime={post.date}>{post.date}</time>
                  <Link href={`/blog/${post.slug}`} className="font-medium text-(--color-accent) hover:underline">
                    Read &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

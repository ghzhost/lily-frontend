"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";

import { scaffoldMessages } from "@/config/messages";
import { routes, siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="border-b border-[var(--color-line)] bg-[var(--color-header-bg)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link
            className="text-lg font-semibold tracking-tight"
            href={routes.home as Route}
          >
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-sm text-(--color-muted)">
            {scaffoldMessages.siteHeader.tagline}
          </p>
        </div>

        {/* Desktop nav */}
        <nav
          aria-label={scaffoldMessages.siteHeader.globalNavigation}
          className="hidden flex-wrap gap-2 text-sm md:flex"
        >
          <Link
            className="rounded-full border border-(--color-line) px-4 py-2 hover:border-(--color-accent)"
            href={routes.docs as Route}
            aria-current={pathname === routes.docs ? "page" : undefined}
          >
            {scaffoldMessages.siteHeader.docs}
          </Link>
          <Link
            className="rounded-full border border-(--color-line) px-4 py-2 hover:border-(--color-accent)"
            href={routes.signin as Route}
            aria-current={pathname === routes.signin ? "page" : undefined}
          >
            {scaffoldMessages.siteHeader.signIn}
          </Link>
          <Link
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[var(--color-panel-contrast)] hover:opacity-90"
            href={routes.dashboard as Route}
            aria-current={pathname === routes.dashboard ? "page" : undefined}
          >
            {scaffoldMessages.siteHeader.dashboard}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-ink)] hover:bg-[var(--color-surface)] md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          ref={menuRef}
          className="border-t border-[var(--color-line)] bg-white px-4 pb-4 pt-2 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2 text-sm">
            <Link
              className="rounded-md px-3 py-2 hover:bg-[var(--color-surface)]"
              href={routes.docs as Route}
              onClick={() => setIsOpen(false)}
            >
              {scaffoldMessages.siteHeader.docs}
            </Link>
            <Link
              className="rounded-md px-3 py-2 hover:bg-[var(--color-surface)]"
              href={routes.signin as Route}
              onClick={() => setIsOpen(false)}
            >
              {scaffoldMessages.siteHeader.signIn}
            </Link>
            <Link
              className="rounded-md bg-[var(--color-ink)] px-3 py-2 text-center text-white hover:opacity-90"
              href={routes.dashboard as Route}
              onClick={() => setIsOpen(false)}
            >
              {scaffoldMessages.siteHeader.dashboard}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

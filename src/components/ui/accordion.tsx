"use client";

import { useState, useId, useCallback, useRef, useEffect, type KeyboardEvent } from "react";

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();
  const headerId = `${id}-header`;
  const panelId = `${id}-panel`;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      const h = contentRef.current.scrollHeight;
      setHeight(h);
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      const h = contentRef.current.scrollHeight;
      setHeight(h);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0);
        });
      });
    }
  }, [isOpen]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <div className="border-b border-[var(--color-line)]">
      <h3>
        <button
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          className="flex w-full items-center justify-between py-4 text-left font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
        >
          {title}
          <span
            className={`ml-4 transition-transform duration-300 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            ▼
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        ref={contentRef}
        style={{
          height: height === undefined ? "auto" : `${height}px`,
          overflow: height === undefined ? "visible" : "hidden",
        }}
        className="transition-[height] duration-300 ease-in-out motion-reduce:transition-none"
      >
        <div className="pb-4 text-[var(--color-muted)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className = "" }: AccordionProps) {
  return (
    <div className={`divide-y divide-[var(--color-line)] ${className}`}>
      {children}
    </div>
  );
}

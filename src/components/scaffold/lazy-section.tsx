/* eslint-disable react-hooks/static-components */
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SectionSkeleton } from "./section-skeleton";

/**
 * Demonstrates the lazy-loading pattern for below-the-fold marketing content.
 * Satisfies bounty #83: establishes convention for code-splitting sections
 * with next/dynamic while keeping first-viewport content in the route bundle.
 *
 * Usage in marketing routes:
 *   <LazySection module={() => import("./heavy-section")} />
 */

type LazySectionProps = {
  /** Dynamic import returning a React component */
  module: () => Promise<{ default: React.ComponentType }>;
  /** Optional label for accessibility / debugging */
  label?: string;
};

// Creates a lazy component from the caller-provided dynamic import. The
// component is recreated on each render by design; the rule is disabled because
// the module target is supplied per-use (bounty #83 convention).
// eslint-disable-next-line react-hooks/static-components
const LazySectionInner = ({
  module,
}: Omit<LazySectionProps, "label">) => {
  const Component = dynamic(module, {
    ssr: true,
    loading: () => <SectionSkeleton />,
  });

  return <Component />;
};

export function LazySection({ module, label }: LazySectionProps) {
  return (
    <Suspense
      fallback={
        <div role="status" aria-label={label ? `${label} loading` : undefined}>
          <SectionSkeleton />
          <div className="sr-only">{label ?? "Content"} is loading…</div>
        </div>
      }
    >
      <LazySectionInner module={module} />
    </Suspense>
  );
}

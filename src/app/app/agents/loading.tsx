import { SkeletonCard } from '@/components/ui/skeleton';

export default function AgentsLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="space-y-4">
      <span className="sr-only">Loading agents registry...</span>
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonCard className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]" />
        <SkeletonCard className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]" />
        <SkeletonCard className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]" />
        <SkeletonCard className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]" />
      </div>
    </div>
  );
}

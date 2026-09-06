"use client";

import { useState } from "react";

import { copyText } from "@/lib/clipboard";

type CopyButtonProps = {
  readonly text: string;
  readonly label?: string;
  readonly copiedLabel?: string;
  readonly failedLabel?: string;
  readonly className?: string;
};

type CopyState = "idle" | "copied" | "failed";

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  failedLabel = "Copy failed",
  className,
}: CopyButtonProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  async function handleCopy() {
    const ok = await copyText(text);

    setCopyState(ok ? "copied" : "failed");
    window.setTimeout(() => setCopyState("idle"), 2000);
  }

  const buttonLabel =
    copyState === "copied"
      ? copiedLabel
      : copyState === "failed"
        ? failedLabel
        : label;

  return (
    <button
      aria-live="polite"
      className={cx(
        "inline-flex min-h-10 items-center justify-center rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none",
        copyState === "copied" &&
          "border-[var(--color-accent)] bg-[var(--color-panel-muted)]",
        className,
      )}
      onClick={handleCopy}
      type="button"
    >
      {buttonLabel}
    </button>
  );
}

function cx(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

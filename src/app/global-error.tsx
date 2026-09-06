"use client";

import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function GlobalErrorPanel({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md w-full space-y-6 text-center">
      <h1 className="text-2xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-[var(--color-muted)] font-[family-name:var(--font-ibm-plex-mono)] text-sm break-words">
        {error.message || "An unexpected error occurred"}
      </p>
      {error.digest && (
        <p className="text-[var(--color-muted)] font-[family-name:var(--font-ibm-plex-mono)] text-xs">
          Digest: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]"
      >
        Try again
      </button>
    </div>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)] font-[family-name:var(--font-space-grotesk)] flex items-center justify-center p-6">
        <GlobalErrorPanel error={error} reset={reset} />
      </body>
    </html>
  );
}

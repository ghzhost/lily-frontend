import type { CultureValue, OpenRole } from "./types";

export const mockCultureValues: readonly CultureValue[] = [
  {
    id: "autonomy",
    title: "High Autonomy, Clear Ownership",
    description: "We trust engineers and designers to own problems end-to-end with direct accountability to our users.",
  },
  {
    id: "open-source",
    title: "Open Source by Default",
    description: "Our protocols, SDKs, and developer tools are built in the open with community collaboration.",
  },
  {
    id: "rigor",
    title: "Engineering Rigor",
    description: "We prioritize correctness, deterministic testing, and high reliability across all distributed protocols.",
  },
  {
    id: "remote",
    title: "Global & Remote-First",
    description: "Our team spans multiple continents and timezones, operating asynchronously with clear documentation.",
  },
] as const;

export const mockOpenRoles: readonly OpenRole[] = [
  {
    id: "sr-frontend-engineer",
    title: "Senior Frontend Engineer",
    team: "Product Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    applyHref: "mailto:careers@lillyprotocol.com?subject=Application:%20Senior%20Frontend%20Engineer",
  },
  {
    id: "protocol-engineer",
    title: "Core Protocol Engineer",
    team: "Infrastructure",
    location: "Remote (Global)",
    type: "Full-time",
    applyHref: "mailto:careers@lillyprotocol.com?subject=Application:%20Core%20Protocol%20Engineer",
  },
  {
    id: "developer-advocate",
    title: "Developer Advocate",
    team: "Ecosystem & Growth",
    location: "Remote (US / EU)",
    type: "Full-time",
    applyHref: "mailto:careers@lillyprotocol.com?subject=Application:%20Developer%20Advocate",
  },
  {
    id: "security-researcher",
    title: "Security Researcher",
    team: "Security",
    location: "Remote (Global)",
    type: "Full-time",
    applyHref: "mailto:careers@lillyprotocol.com?subject=Application:%20Security%20Researcher",
  },
] as const;

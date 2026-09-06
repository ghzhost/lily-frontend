import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";

describe("images.remotePatterns (#126)", () => {
  it("defines remote patterns for OG and CDN assets", () => {
    const patterns = nextConfig.images?.remotePatterns;
    expect(patterns).toBeDefined();
    expect(Array.isArray(patterns)).toBe(true);
    expect(patterns!.length).toBeGreaterThan(0);

    const hostnames = patterns!.map((p) => p.hostname);
    expect(hostnames).toContain("opengraph.example.com");
    expect(hostnames.some((h) => h.includes("lilyprotocol.dev"))).toBe(true);
  });
});

import nextConfig from "../../next.config";

describe("next.config production headers", () => {
  it("disables the X-Powered-By fingerprint header", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("configures canonical security headers including Permissions-Policy", async () => {
    const headerConfigs = await nextConfig.headers?.();
    expect(headerConfigs).toBeDefined();
    const globalHeaders = headerConfigs?.find((c) => c.source === "/:path*");
    expect(globalHeaders).toBeDefined();
    const headerKeys = globalHeaders?.headers.map((h) => h.key);
    expect(headerKeys).toContain("Content-Security-Policy");
    expect(headerKeys).toContain("Referrer-Policy");
    expect(headerKeys).toContain("Permissions-Policy");
    expect(headerKeys).toContain("X-Content-Type-Options");
    expect(headerKeys).toContain("X-Frame-Options");
  });
});

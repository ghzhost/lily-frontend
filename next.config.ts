import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

export const legacyRedirects = [
  {
    source: "/dash",
    destination: "/app",
    permanent: true,
  },
  {
    source: "/sign-up",
    destination: "/signup",
    permanent: true,
  },
] as const;

const nextConfig: NextConfig = {
  output: "standalone",
  typedRoutes: true,
  turbopack: {},
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.lilyprotocol.dev",
      },
      {
        protocol: "https",
        hostname: "cdn.lilyprotocol.dev",
      },
      {
        protocol: "https",
        hostname: "**.lillyprotocol.dev",
      },
      {
        protocol: "https",
        hostname: "cdn.lillyprotocol.dev",
      },
      {
        protocol: "https",
        hostname: "opengraph.example.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return legacyRedirects as unknown as { source: string; destination: string; permanent: boolean }[];
  },
};

export default withSerwist(nextConfig);

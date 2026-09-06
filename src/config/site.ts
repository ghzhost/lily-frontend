import type { Metadata } from 'next';

import { staticSitePages } from '@/config/routes';

import type { SitePage, StaticSiteRoute } from '@/types/site';

export const routes = {
  home: '/',
  about: '/about',
  docs: '/docs',
  status: '/status',
  signin: '/signin',
  dashboard: '/app',
} as const satisfies Record<string, StaticSiteRoute>;

export const siteConfig = {
  name: 'Lily Protocol',
  shortName: 'Lily',
  description:
    'Contributor-ready frontend foundation for Lily Protocol, designed for issue-driven UI and product development.',
  tagline: 'A stable Next.js frontend foundation for issue-driven open source contribution.',
  url: 'https://lilyprotocol.dev',
  manifestPath: '/manifest.webmanifest',
  themeColor: '#f7f7f5',
  keywords: ['Stellar', 'frontend', 'Next.js', 'TypeScript', 'contributors', 'open source', 'web3'],
  pages: staticSitePages as readonly SitePage[],
} as const;

type SiteMetadataOptions = {
  canonical?: string;
};

export function createSiteMetadata(
  options: SiteMetadataOptions = {},
): Metadata {
  const canonical = options.canonical ?? siteConfig.url;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    manifest: siteConfig.manifestPath,
    keywords: [...siteConfig.keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.tagline,
      type: 'website',
      siteName: siteConfig.name,
      url: siteConfig.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.tagline,
    },
  };
}

export function createPageMetadata(path: StaticSiteRoute): Metadata {
  return createSiteMetadata({ canonical: getAbsoluteUrl(path) });
}

export function getAbsoluteUrl(path: StaticSiteRoute): string {
  if (path === routes.home) {
    return siteConfig.url;
  }

  return new URL(path, siteConfig.url).toString();
}

export { createOrganizationJsonLd } from "./json-ld";


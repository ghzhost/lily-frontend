import type { MetadataRoute } from 'next';

import { defaultSitemapUpdatedAt } from '@/config/routes';
import { getAbsoluteUrl, siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.pages.map((page) => ({
    url: getAbsoluteUrl(page.path),
    lastModified: new Date(page.updatedAt ?? defaultSitemapUpdatedAt),
    changeFrequency: 'weekly',
    priority: page.priority,
  }));
}


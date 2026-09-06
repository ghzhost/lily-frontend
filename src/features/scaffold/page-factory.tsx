import type { Metadata } from 'next';

import { PageScaffold } from '@/components/scaffold/page-scaffold';
import { getRouteScaffold } from '@/config/routes';
import { siteConfig } from '@/config/site';
import type { RouteScaffold } from '@/types/site';

export function createScaffoldPage(routeId: RouteScaffold['id']) {
  const route = getRouteScaffold(routeId);

  return function ScaffoldPage() {
    return <PageScaffold route={route} />;
  };
}

export function createScaffoldMetadata(
  routeId: RouteScaffold["id"],
): Metadata {
  const route = getRouteScaffold(routeId);
  const title = route.title;
  const description = route.purpose;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.name,
      url: new URL(route.path, siteConfig.url).toString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

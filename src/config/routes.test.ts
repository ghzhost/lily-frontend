import { getRouteScaffold, routeScaffolds, staticSitePages } from './routes';

describe('route scaffolds', () => {
  it('covers the planned contributor-facing route map', () => {
    expect(routeScaffolds).toHaveLength(25);
    expect(getRouteScaffold('landing').path).toBe('/');
    expect(getRouteScaffold('agent-detail').path).toBe('/app/agents/[id]');
  });

  it('keeps only static pages in the sitemap list', () => {
    expect(staticSitePages.some((page) => page.path === '/')).toBe(true);
    expect(staticSitePages.some((page) => page.path === '/docs')).toBe(true);
    expect(getRouteScaffold('agent-detail').includeInSitemap).not.toBe(true);
  });

  it('groups scaffold routes by section', () => {
    expect(getRouteScaffold('signin').section).toBe('auth');
    expect(getRouteScaffold('settings').section).toBe('dashboard');
  });
});

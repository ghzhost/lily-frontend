# Layout Architecture

Lily Frontend uses Next.js route groups to share navigation shells without
adding group names to public URLs. Every page starts at `RootLayout`, then one
of four section layouts supplies the route-specific shell.

```text
src/app/layout.tsx (RootLayout: fonts, metadata, global CSS)
|
+-- (marketing)/layout.tsx
|   `-- SectionLayout(marketing routes) -> public marketing pages
+-- (auth)/layout.tsx
|   `-- SectionLayout(auth routes) -> /signin and /signup
+-- (support)/layout.tsx
|   `-- SectionLayout(docs + legal routes) -> docs, status, and policies
`-- app/layout.tsx
    `-- SectionLayout(dashboard routes) -> authenticated /app pages
```

Parenthesized folders are URL-neutral. For example,
`src/app/(marketing)/about/page.tsx` is served at `/about`, while the dashboard
folder is a real URL segment and `src/app/app/settings/page.tsx` is served at
`/app/settings`.

## Shared Section Shell

Each section layout looks up display copy in `sectionDefinitions`, obtains its
routes with `getSectionRoutes`, and passes both to `SectionLayout`.
`SectionLayout` composes the shared shell as follows:

```text
SectionLayout
+-- SiteHeader (global navigation)
`-- content row
    +-- aside
    |   +-- section label and description
    |   `-- SectionNav (links from the supplied RouteScaffold array)
    `-- page content (`children`)
```

The support layout is the intentional exception to a one-section-per-layout
mapping. It combines the `docs` and `legal` route arrays so documentation,
status, and policy pages share one sidebar while retaining distinct typed
sections.

## Typed Route Data Flow

`src/types/site.ts` defines `RouteSection` as the five allowed data categories:
`marketing`, `auth`, `legal`, `docs`, and `dashboard`. The same file defines
`SectionDefinition` and `RouteScaffold`, so an invalid section key is rejected
by TypeScript.

`src/config/routes.ts` is the source of truth:

1. `sectionDefinitions` maps every `RouteSection` key to sidebar copy.
2. `routeScaffolds` assigns each route a path, section, purpose, and sitemap
   policy.
3. `getSectionRoutes(section)` filters that registry for a layout's sidebar.
4. The layout passes the selected definition and routes to `SectionLayout`.
5. `SectionNav` renders static routes as links and the dynamic agent detail
   scaffold as a non-clickable reference entry.

Sitemap generation uses the same registry through `staticSitePages`, so route
ownership and public indexing stay aligned.

## Adding Routes And Layouts

- Add a page to an existing group when it should reuse that group's shell and
  navigation. Add its `RouteScaffold` entry with the matching section key.
- Extend `(support)` when a docs or legal page should remain in the combined
  support sidebar. Do not create another layout merely to separate its data
  category.
- Create a new route-group layout only when several pages need a genuinely
  different shared shell, navigation set, or access boundary. Add a new
  `RouteSection` key, matching `sectionDefinitions` entry, route scaffolds, and
  focused layout tests in the same change.
- Keep route `page.tsx` files focused on page composition. Shared header,
  sidebar, and section navigation behavior belongs in the scaffold components.


## Internationalization (i18n)

> **Status: Deferred.** The `next-intl` dependency and associated scaffolding
> (`src/i18n/`, `src/app/[locale]/`, `messages/`) were removed because only a
> single locale (`en`) was defined and the wiring was incomplete (root layout
> never mounted `[locale]`, causing dead code paths and TS2307 errors).
>
> When i18n becomes a real requirement:
> 1. Re-add `next-intl` to `package.json`
> 2. Restore `src/i18n/routing.ts` and `src/i18n/request.ts`
> 3. Create `src/app/[locale]/layout.tsx` with `NextIntlClientProvider`
> 4. Update `src/app/layout.tsx` to derive `<html lang>` from the locale
> 5. Add `src/middleware.ts` integration with `createMiddleware` from
>    `next-intl/routing`
> 6. Populate `messages/` with translation files for each supported locale

# Lily Frontend

<img width="1197" height="407" alt="image" src="https://github.com/user-attachments/assets/1cbfb0fe-3668-4e82-8fda-68b1cc4efc25" />

Contributor-ready frontend foundation for Lily Protocol. This repository is intentionally light on shipped product UI so contributors can build features through scoped issues and pull requests.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest&logoColor=white)
[![CI](https://github.com/lily-protocol/lily-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/lily-protocol/lily-frontend/actions/workflows/ci.yml)
![Docker](https://img.shields.io/badge/Docker-Planned-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-Private-5B5B5B)

**Website:** [agent-lily.online](https://www.agent-lily.online)  
**Design:** [Figma — Lily Protocol](https://www.figma.com/design/GRBeDGDHzCGXefm3xmlbHF/Lily-Protocol?node-id=0-1&t=SiCYBGotCg7HcXhe-1)
**Design Tokens:** [docs/design-tokens.md](./docs/design-tokens.md) — CSS custom properties reference and Figma mapping

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9
- Vitest + Testing Library
- GitHub Actions CI

## Current scope

- Stabilized Next.js foundation with strict security headers (`Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`, `X-Frame-Options`)
- Strict TypeScript, linting, tests, and CI
- Contributor workflow and GitHub templates
- Shared layout scaffolds for marketing, auth, support, and dashboard surfaces
- Route-level scaffold pages for planned product and public screens

The main dashboard, landing experience, and protocol-facing UI should be introduced through issues rather than prebuilt in the base branch. This repository should feel ready to implement from [Figma](https://www.figma.com/design/GRBeDGDHzCGXefm3xmlbHF/Lily-Protocol?node-id=0-1&t=SiCYBGotCg7HcXhe-1), not already finished.

## Local development

Ensure you are using Node.js 22 (matches `engines` and CI):

```bash
nvm install
nvm use
```

Install dependencies and start the dev server:

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.
2. Run `npm install`.
3. Run `npm run dev`.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@lily-protocol.dev.

```bash
nvm install
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed frontend origin and
`NEXT_PUBLIC_API_BASE_URL` to the browser-accessible Lily API base URL. Public
environment access is centralized and validated in `src/config/env.ts`; add new
`NEXT_PUBLIC_*` values there instead of reading `process.env` throughout the app.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Use Node.js `22+`. The `.nvmrc`, `package.json` engines field, and CI workflow all target Node 22 so local and CI environments stay aligned.

### Remote images

`next.config.ts` includes narrowly scoped placeholder patterns for the planned OG image service (`opengraph.example.com/og/**`) and asset CDN (`assets.example.com/lily/**`). Before using either service with `next/image`, replace its example hostname and path with the real provider values. Add another `images.remotePatterns` entry for each additional HTTPS host or path instead of broadening an existing pattern. Keep `port: ""` to disallow custom ports; add a `search` value when the provider uses one fixed query string.

Docker is not configured in this repository yet. The badge above marks it as planned rather than available today.

## Quality checks

## Legacy route redirects

This project uses Next.js `redirects()` in `next.config.ts` to map legacy URLs
(e.g. `/dash`, `/sign-up`, `/agents/:id`) to their current canonical paths under
`/app`. When adding new routes or renaming existing ones, append a permanent
redirect entry to the `redirects()` array in `next.config.ts` so old bookmarks
and external links continue to work.

```bash
npm run lint
npm run typecheck
npm run test:run
npm run test:e2e
npm run build
npm run check
npm run format
npm run clean
npm run icons
```

`npm run check` mirrors CI and is the fastest way to validate a contribution before opening a PR.
`npm run format` applies Prettier to supported repository files. `npm run clean` removes the generated `.next`, `coverage`, and `tsconfig.tsbuildinfo` artifacts.
`npm run icons` regenerates the canonical public icon assets using brand design tokens from `src/app/globals.css`.

## Motion tokens

Motion values live in `src/app/globals.css`. Use `--duration-fast` for hover
feedback, `--duration-base` for ordinary state changes, and `--duration-slow`
for larger transitions. Pair them with `--ease-standard`; interactive links can
use the shared `motion-link` class, which becomes instant when the user prefers
reduced motion.

## Project structure

See [ADR-0001: Route Scaffold Architecture](docs/adr/0001-route-scaffold-architecture.md) for the architectural decision behind this structure.

```text
src/
  app/                  App Router routes, route groups, and layouts
  components/scaffold/  Shared route-shell and layout primitives
  components/ui/        Reusable UI primitives (timeline, etc.)
  config/               Site metadata and route registry
  features/scaffold/    Generic scaffold page helpers
  instrumentation.ts    Server-side error observability and telemetry hook
  test/                 Shared test setup
  types/                Shared TypeScript types
docs/
  adr/                  Architecture Decision Records (see ADR 0001: Route-Scaffold Architecture)
.github/
  workflows/            CI automation
  ISSUE_TEMPLATE/       GitHub issue templates
```

## API error handling

Use `lilyFetch` from `src/lib/api/client.ts` for API requests. It throws a
`LilyApiError` with a stable `status`, `code`, and `message`, plus optional
`details`. Transport failures use status `0` and code `NETWORK_ERROR`. Use
`isLilyApiError` when narrowing errors in route-level error UI.

## Route scaffold map

- `Public marketing`: `/`, `/about`, `/blog`, `/changelog`, `/ecosystem`, `/security`, `/grants`, `/careers`, `/contact`
- `Auth`: `/signin`, `/signup`
- `Legal`: `/terms`, `/privacy`, `/cookies`
- `Docs and status`: `/docs`, `/status`
- `Dashboard`: `/app`, `/app/agents`, `/app/agents/[id]`, `/app/payments`, `/app/wallets`, `/app/activity`, `/app/developers`, `/app/settings`

Each route is scaffolded with:

- the route name
- intended screen purpose
- a note that implementation should follow approved Figma work
- natural issue slices contributors can pick up

## Empty state pattern

Use `EmptyState` from `src/components/ui/empty-state.tsx` for planned list surfaces such as `/app/wallets`, `/app/agents`, `/app/activity`, `/blog`, and `/careers`. Pass a decorative icon slot, a route-specific title, a concise description, and an optional CTA link when there is a clear next action.

## Contributor workflow

1. Pick up a scoped issue or create one using the contributor task template.
2. Treat the current UI as a scaffold, not as final product direction.
3. Keep route files in `src/app` thin and move reusable logic into `src/components/scaffold`, `src/features/scaffold`, or `src/config`.
4. Prefer building one issue-sized slice at a time from the approved Figma.
5. Run `npm run check` before opening a pull request.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for workflow expectations, issue triage, and PR guidance. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating.


## Contributor-ready focus

- Page-by-page implementation from Figma
- Reusable shells and layout boundaries instead of completed screens
- Clear route ownership for future issues
- Stable base branch with no speculative product polish

### List empty states

Use `EmptyState` from `src/components/ui/empty-state.tsx` when a list route has
no records to display. Supply the route-specific icon, title, description, and
optional action instead of duplicating empty-state layout styles:

```tsx
<EmptyState
  icon={walletIcon}
  eyebrow="Wallets"
  title="No wallets yet"
  description="Create a wallet to start receiving payments."
  action={<button type="button">Create wallet</button>}
/>
```

## CI

GitHub Actions runs linting, type-checking, tests with coverage, production builds, and Playwright smoke tests on pushes and pull requests. The Playwright job builds the app, serves it with `next start`, and uploads traces and screenshots when the smoke suite fails. Each validation check runs as its own job with `fail-fast` disabled, so you can immediately see exactly what failed without losing the rest of the signal. The workflow also persists `.next/cache` to speed up repeat builds in line with the current Next.js CI caching guidance.

## Notes

This repo uses the `src/` directory convention supported by Next.js 16. Keep App Router routes under `src/app`, route metadata in `src/config`, and reusable scaffold boundaries under `src/components/scaffold` and `src/features/scaffold`.

Shared scaffold dimensions live in `src/app/globals.css`. The layout container is `72rem`, responsive gutters are `1rem`/`1.5rem`/`2rem`, section spacing is `2rem`, and the radius scale is `sm` (`1rem`), `md` (`1.5rem`), `lg` (`1.75rem`), and `xl` (`2rem`). Components should reference these tokens instead of repeating arbitrary values.

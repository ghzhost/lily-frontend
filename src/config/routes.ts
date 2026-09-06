import type { RouteScaffold, SectionDefinition, SitePage, StaticSiteRoute } from '@/types/site';

export const defaultSitemapUpdatedAt = "2026-08-25";

export const sectionDefinitions: readonly SectionDefinition[] = [
  {
    key: "marketing",
    label: "Public marketing",
    description:
      "Top-level public pages that communicate the product and ecosystem.",
  },
  {
    key: 'auth',
    label: 'Auth',
    description: 'Authentication entry points and access setup.',
  },
  {
    key: 'legal',
    label: 'Legal',
    description: 'Policy and legal reference pages.',
  },
  {
    key: 'docs',
    label: 'Docs and status',
    description: 'Documentation and operational trust surfaces.',
  },
  {
    key: "dashboard",
    label: "Dashboard",
    description:
      "Signed-in product surfaces for agents, wallets, payments, and settings.",
  },
] as const;

export const routeScaffolds = [
  {
    id: "landing",
    title: "Landing Page",
    path: "/",
    section: "marketing",
    purpose:
      "Primary public entry point for the product narrative and onboarding funnel.",
    figmaScope:
      "Build the approved landing experience from Figma instead of the removed demo implementation.",
    implementationAreas: [
      'Hero and primary messaging hierarchy',
      'Section ordering and responsive layout system',
      'CTA strategy, empty states, and footer content',
    ],
    includeInSitemap: true,
    updatedAt: "2026-08-25",
  },
  {
    id: "contribute",
    title: "Contribute",
    path: "/contribute",
    section: "marketing",
    purpose: "Onboard new contributors with setup instructions, workflow guidance, and validation steps.",
    figmaScope: "Implement contributor onboarding content from CONTRIBUTING.md until Figma defines a dedicated design.",
    implementationAreas: [
      "Local setup and dependency installation steps",
      "Issue selection and branching workflow",
      "Validation checklist and PR expectations",
    ],
    includeInSitemap: true,
  },
  {
    id: "about",
    title: "About",
    path: "/about",
    section: "marketing",
    purpose: "Explain the team, mission, and protocol context.",
    figmaScope:
      "Implement the approved editorial and brand structure from Figma.",
    implementationAreas: [
      'Mission and company narrative blocks',
      'Leadership or ecosystem credibility sections',
      'Responsive information layout',
    ],
    includeInSitemap: true,
  },
  {
    id: "blog",
    title: "Blog",
    path: "/blog",
    section: "marketing",
    purpose: "Publish updates, educational articles, and ecosystem news.",
    figmaScope:
      "Use Figma to define list, featured post, and editorial navigation patterns.",
    implementationAreas: [
      'Post listing layout and filters',
      'Featured article treatment',
      'States for no posts and pagination',
    ],
    includeInSitemap: true,
  },
  {
    id: "changelog",
    title: "Changelog",
    path: "/changelog",
    section: "marketing",
    purpose:
      "Surface product and protocol updates in a structured release log.",
    figmaScope: "Implement the release timeline and detail pattern from Figma.",
    implementationAreas: [
      'Release entry cards or timeline',
      'Version and date presentation',
      'Search, filters, or grouping affordances',
    ],
    includeInSitemap: true,
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem',
    path: '/ecosystem',
    section: 'marketing',
    purpose: 'Show partners, integrations, and protocol relationships.',
    figmaScope: 'Build the ecosystem map and partner structure from Figma.',
    implementationAreas: [
      'Partner or integration grid',
      'Relationship and category groupings',
      'Responsive card system',
    ],
    includeInSitemap: true,
  },
  {
    id: "security",
    title: "Security",
    path: "/security",
    section: "marketing",
    purpose: "Communicate security posture, process, and disclosures.",
    figmaScope:
      "Translate the trust and assurance page from Figma into reusable sections.",
    implementationAreas: [
      'Security overview blocks',
      'Disclosure or contact flow',
      'Audit, policy, and assurance references',
    ],
    includeInSitemap: true,
  },
  {
    id: "grants",
    title: "Grants",
    path: "/grants",
    section: "marketing",
    purpose: "Describe grant opportunities and program requirements.",
    figmaScope:
      "Use Figma to shape the grant overview and application pathway.",
    implementationAreas: [
      'Eligibility and program criteria layout',
      'Application flow content blocks',
      'Call-to-action and FAQ states',
    ],
    includeInSitemap: true,
  },
  {
    id: 'careers',
    title: 'Careers',
    path: '/careers',
    section: 'marketing',
    purpose: 'Present hiring opportunities and team culture.',
    figmaScope: 'Implement the recruiting page structure approved in Figma.',
    implementationAreas: [
      'Open roles list',
      'Culture and values content sections',
      'Application CTA and empty state',
    ],
    includeInSitemap: true,
  },
  {
    id: 'contact',
    title: 'Contact',
    path: '/contact',
    section: 'marketing',
    purpose: 'Offer clear inbound contact channels and expectations.',
    figmaScope: 'Build the contact experience and trust cues from Figma.',
    implementationAreas: [
      'Contact options and routing choices',
      'Form or inquiry scaffold',
      'Response-time and support guidance',
    ],
    includeInSitemap: true,
  },
  {
    id: "signin",
    title: "Sign In",
    path: "/signin",
    section: "auth",
    purpose: "Authenticate returning users into the dashboard experience.",
    figmaScope:
      "Implement the sign-in layout, states, and error flows from Figma.",
    implementationAreas: [
      'Authentication form structure',
      'Validation, loading, and failure states',
      'Secondary recovery and support paths',
    ],
    includeInSitemap: false,
  },
  {
    id: 'signup',
    title: 'Sign Up',
    path: '/signup',
    section: 'auth',
    purpose: 'Onboard new users into the product.',
    figmaScope: 'Build the sign-up flow and supporting guidance from Figma.',
    implementationAreas: [
      'Registration form structure',
      'Validation and account setup states',
      'Context and trust-building content',
    ],
    includeInSitemap: false,
  },
  {
    id: "terms",
    title: "Terms of Service",
    path: "/terms",
    section: "legal",
    purpose: "Present service terms and usage expectations.",
    figmaScope:
      "Implement the legal document layout from Figma or editorial guidance.",
    implementationAreas: [
      'Readable long-form document layout',
      'Section navigation or anchors',
      'Revision metadata treatment',
    ],
    includeInSitemap: true,
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    path: "/privacy",
    section: "legal",
    purpose: "Explain privacy and data handling commitments.",
    figmaScope:
      "Build the policy reading experience from Figma or legal content guidance.",
    implementationAreas: [
      'Long-form policy layout',
      'Section anchors or sticky nav',
      'Revision metadata treatment',
    ],
    includeInSitemap: true,
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    path: "/cookies",
    section: "legal",
    purpose: "Document cookie and tracking usage.",
    figmaScope:
      "Implement the cookie policy reading pattern from Figma or editorial guidance.",
    implementationAreas: [
      'Long-form policy layout',
      'Section navigation',
      'Revision metadata treatment',
    ],
    includeInSitemap: true,
  },
  {
    id: "docs",
    title: "Documentation",
    path: "/docs",
    section: "docs",
    purpose: "Host product and developer documentation entry points.",
    figmaScope:
      "Translate the docs IA, navigation, and overview screens from Figma.",
    implementationAreas: [
      'Docs landing and navigation patterns',
      'Search or category affordances',
      'Responsive docs content layout',
    ],
    includeInSitemap: true,
  },
  {
    id: 'status',
    title: 'Status Page',
    path: '/status',
    section: 'docs',
    purpose: 'Communicate system health, incidents, and uptime history.',
    figmaScope: 'Implement the operational status UI from Figma.',
    implementationAreas: [
      'System status summary',
      'Incident and maintenance feed',
      'Historical uptime presentation',
    ],
    includeInSitemap: true,
  },
  {
    id: "dashboard-overview",
    title: "Dashboard Overview",
    path: "/app",
    section: "dashboard",
    purpose: "Primary authenticated overview of the product workspace.",
    figmaScope:
      "Build the overview information architecture from Figma, not from legacy demo UI.",
    implementationAreas: [
      'Summary cards and dashboard layout',
      'Primary navigation and responsive shell behavior',
      'Loading, empty, and connected states',
    ],
    includeInSitemap: false,
  },
  {
    id: 'agents',
    title: 'Agents Registry',
    path: '/app/agents',
    section: 'dashboard',
    purpose: 'List and manage registered agents.',
    figmaScope: 'Implement the agents list, actions, and states from Figma.',
    implementationAreas: [
      'Table or card listing structure',
      'Filtering, sorting, and status states',
      'Navigation into agent detail views',
    ],
    includeInSitemap: false,
  },
  {
    id: "agent-detail",
    title: "Agent Detail View",
    path: "/app/agents/[id]",
    section: "dashboard",
    purpose: "Inspect and manage a specific agent.",
    figmaScope:
      "Use Figma for the detail tabs, summary state, and deeper workflows.",
    implementationAreas: [
      'Header summary and detail layout',
      'Nested sections or tabs',
      'Loading, error, and missing-agent states',
    ],
    includeInSitemap: false,
  },
  {
    id: 'payments',
    title: 'Payments',
    path: '/app/payments',
    section: 'dashboard',
    purpose: 'Track and manage payment activity.',
    figmaScope: 'Implement the payment workflow views from Figma.',
    implementationAreas: [
      'Payment list and filtering layout',
      'Status indicators and transaction states',
      'Detail or drill-down interaction patterns',
    ],
    includeInSitemap: false,
  },
  {
    id: 'wallets',
    title: 'Wallets & Balances',
    path: '/app/wallets',
    section: 'dashboard',
    purpose: 'View balances, wallet state, and related controls.',
    figmaScope: 'Use Figma for wallet summary, balances, and action patterns.',
    implementationAreas: [
      'Balance presentation and account grouping',
      'Wallet state and actions',
      'Responsive financial data layout',
    ],
    includeInSitemap: false,
  },
  {
    id: 'activity',
    title: 'Activity Feed',
    path: '/app/activity',
    section: 'dashboard',
    purpose: 'Review product and protocol activity over time.',
    figmaScope: 'Implement the feed and event presentation approved in Figma.',
    implementationAreas: [
      'Feed hierarchy and event grouping',
      'Filters and time-based organization',
      'Dense-data responsive behavior',
    ],
    includeInSitemap: false,
  },
  {
    id: "developers",
    title: "Developer Console",
    path: "/app/developers",
    section: "dashboard",
    purpose: "Provide developer-specific tooling and references.",
    figmaScope:
      "Translate the developer workspace patterns from Figma into reusable modules.",
    implementationAreas: [
      'Console navigation and utility panels',
      'Credential, SDK, or API-related surfaces',
      'Copy-heavy and dense layout states',
    ],
    includeInSitemap: false,
  },
  {
    id: 'settings',
    title: 'Settings',
    path: '/app/settings',
    section: 'dashboard',
    purpose: 'Manage workspace and account configuration.',
    figmaScope: 'Build the settings IA, categories, and forms from Figma.',
    implementationAreas: [
      'Settings sections and navigation',
      'Form states and confirmation patterns',
      'Danger-zone and recovery flows',
    ],
    includeInSitemap: false,
  },
] as const satisfies readonly RouteScaffold[];

export const staticSitePages = routeScaffolds
  .filter((route) => route.includeInSitemap)
  .map((route) => ({
    path: route.path as StaticSiteRoute,
    priority: route.path === '/' ? 1 : 0.8,
    ...("updatedAt" in route && typeof route.updatedAt === "string" ? { updatedAt: route.updatedAt } : {}),
  })) as readonly SitePage[];

export function getRouteScaffold(routeId: RouteScaffold['id']): RouteScaffold {
  const match = routeScaffolds.find((route) => route.id === routeId);

  if (!match) {
    throw new Error(`Unknown route scaffold: ${routeId}`);
  }

  return match;
}

export function getSectionRoutes(section: RouteScaffold['section']) {
  return routeScaffolds.filter((route) => route.section === section);
}

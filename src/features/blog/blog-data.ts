export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogCategories = [
  "All",
  "Engineering",
  "Product",
  "Compliance",
  "Research",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const mockBlogPosts: readonly BlogPost[] = [
  {
    slug: "introducing-deterministic-agent-coordination",
    title: "Introducing Deterministic Agent Coordination for Autonomous Networks",
    excerpt: "How Lily Protocol enables verifiable state transitions, decentralized compute verification, and trustless settlement for AI agent workflows.",
    category: "Engineering",
    date: "2026-08-28",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "zero-knowledge-execution-proofs-explained",
    title: "Zero-Knowledge Execution Proofs in Distributed Compute",
    excerpt: "A technical deep-dive into recursive zk-SNARKs and how we verify off-chain compute on resource-constrained validators.",
    category: "Engineering",
    date: "2026-08-20",
    readTime: "8 min read",
  },
  {
    slug: "designing-enterprise-treasury-controls",
    title: "Designing Enterprise Treasury Controls for Decentralized Teams",
    excerpt: "Multi-signature workflows, time-locked transaction approvals, and role-based permissions in the Lily Protocol dashboard.",
    category: "Product",
    date: "2026-08-14",
    readTime: "4 min read",
  },
  {
    slug: "navigating-global-crypto-compliance-frameworks",
    title: "Navigating Global Compliance Frameworks for Autonomous Protocols",
    excerpt: "Best practices for decentralized organizations balancing cryptographic privacy with regulatory compliance standards.",
    category: "Compliance",
    date: "2026-08-05",
    readTime: "5 min read",
  },
  {
    slug: "improving-validator-slashing-resilience",
    title: "Improving Validator Slashing Resilience under High Network Latency",
    excerpt: "Analyzing Byzantine consensus edge-cases and tuning heartbeat thresholds for global validator stability.",
    category: "Engineering",
    date: "2026-07-29",
    readTime: "7 min read",
  },
] as const;

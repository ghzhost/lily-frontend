export interface ContactChannel {
  id: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const contactChannels: readonly ContactChannel[] = [
  {
    id: "support",
    title: "General Support",
    description: "Get assistance with your workspace, integrations, and account inquiries.",
    href: "mailto:support@lillyprotocol.com",
    actionLabel: "Email support",
  },
  {
    id: "security",
    title: "Security & Vulnerability",
    description: "Report responsible disclosure findings or security-related concerns directly to our team.",
    href: "mailto:security@lillyprotocol.com",
    actionLabel: "Contact security",
  },
  {
    id: "community",
    title: "Community & Developers",
    description: "Connect with fellow developers, ask questions, and share project feedback.",
    href: "https://discord.gg/lillyprotocol",
    actionLabel: "Join Discord",
  },
] as const;

export const responseGuidance = {
  general: "We typically respond to inquiries within 1–2 business days.",
  security: "Security disclosures are prioritized and reviewed within 24 hours.",
  availability: "Support operations run Monday through Friday, 9:00 AM – 6:00 PM UTC.",
} as const;

export const faqItems: readonly FaqItem[] = [
  {
    question: "How quickly will I receive a response?",
    answer: "Most general and developer support inquiries receive a reply within 1–2 business days. Urgent security reports are triaged within 24 hours.",
  },
  {
    question: "How do I report a security vulnerability?",
    answer: "Please email security@lillyprotocol.com with technical reproduction steps and severity details. We honor coordinated responsible disclosure.",
  },
  {
    question: "How can I contribute to Lily Protocol?",
    answer: "Check our open issues on GitHub and read our CONTRIBUTING guide. We welcome community pull requests and bounty contributions.",
  },
  {
    question: "Where can I find API documentation?",
    answer: "Visit /docs for our complete API references, SDK documentation, and architecture guides.",
  },
] as const;

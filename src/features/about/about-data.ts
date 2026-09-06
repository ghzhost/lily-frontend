export interface MissionStatement {
  headline: string;
  lead: string;
  paragraphs: readonly string[];
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
}

export interface EcosystemPartner {
  id: string;
  name: string;
  role: string;
  description: string;
}

export const missionStatement: MissionStatement = {
  headline: "Building trustless, deterministic infrastructure for autonomous systems.",
  lead: "Lily Protocol provides the coordination layer, verification gates, and economic incentives required for decentralized agent networks.",
  paragraphs: [
    "Modern digital economies require infrastructure that operates without centralized points of failure, single custodians, or opaque execution environments.",
    "We design protocol primitives that prioritize verifiable correctness, transparent auditability, and permissionless developer participation across global networks.",
  ],
};

export const coreValues: readonly AboutValue[] = [
  {
    id: "verifiable-correctness",
    title: "Verifiable Correctness",
    description: "Every state transition, execution proof, and contract balance must be mathematically provable and reproducible.",
  },
  {
    id: "open-collaboration",
    title: "Open Collaboration",
    description: "Our standards, codebases, and architectural proposals are developed openly in public repositories with community peer review.",
  },
  {
    id: "resilient-decentralization",
    title: "Resilient Decentralization",
    description: "We build systems designed to withstand Byzantine environments, network partitions, and adversarial operational conditions.",
  },
  {
    id: "developer-sovereignty",
    title: "Developer Sovereignty",
    description: "Builders retain full custody of their keys, workflows, and execution environments without proprietary vendor lock-in.",
  },
] as const;

export const ecosystemHighlights: readonly EcosystemPartner[] = [
  {
    id: "validator-network",
    name: "Global Validator Cohort",
    role: "Consensus & Finality",
    description: "Over 120 independent node operators securing cross-chain proofs and consensus pipelines across 24 countries.",
  },
  {
    id: "research-consortium",
    name: "Applied Cryptography Labs",
    role: "Zero-Knowledge Research",
    description: "Collaborative research with academic and independent cryptography institutions exploring recursive zero-knowledge rollups.",
  },
  {
    id: "developer-guild",
    name: "Open Source Guild",
    role: "Tooling & SDKs",
    description: "A community of hundreds of active open-source contributors maintaining client SDKs, developer templates, and debugging harnesses.",
  },
] as const;

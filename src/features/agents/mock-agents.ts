import type { Agent } from './types';

export const mockAgents: readonly Agent[] = [
  {
    id: 'agentlily_demo_001',
    name: 'Lily Core Sentinel',
    description: 'Autonomous validator ensuring consensus and smart contract invariants.',
    status: 'active',
    tasksCompleted: 1420,
  },
  {
    id: 'agentlily_audit_002',
    name: 'Shield Auditor',
    description: 'Automated vulnerability scanner for zero-day dependency detection.',
    status: 'registered',
    tasksCompleted: 350,
  },
  {
    id: 'agentlily_settle_003',
    name: 'Payment Settlement Relay',
    description: 'Cross-chain liquidity routing and multi-token disbursement.',
    status: 'active',
    tasksCompleted: 8912,
  },
  {
    id: 'agentlily_bridge_004',
    name: 'Ecosystem Bridge Oracle',
    description: 'Cryptographic proof verification for cross-network state sync.',
    status: 'paused',
    tasksCompleted: 420,
  },
  {
    id: 'agentlily_telemetry_005',
    name: 'Network Telemetry Watcher',
    description: 'Low-latency distributed telemetry and node health reporting.',
    status: 'registered',
    tasksCompleted: 104,
  },
  {
    id: 'agentlily_indexer_006',
    name: 'Ledger Indexer Service',
    description: 'High-throughput block indexing and GraphQL event subscriptions.',
    status: 'active',
    tasksCompleted: 4519,
  },
];

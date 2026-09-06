export type AgentStatus = 'active' | 'registered' | 'paused';

export interface Agent {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: AgentStatus;
  readonly tasksCompleted: number;
}

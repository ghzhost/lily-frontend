import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const WithoutAction: Story = {
  args: {
    icon: "🌟",
    title: "No transactions yet",
    description: "When you make your first payment, it will appear here.",
  },
};

export const WithAction: Story = {
  args: {
    icon: "⚡",
    title: "Start building",
    description: "Deploy your first AI agent payment flow in under 5 minutes.",
  },
};

export const WithEyebrow: Story = {
  args: {
    icon: "🔔",
    title: "All caught up",
    description: "No new notifications at this time.",
    eyebrow: "Notifications",
  },
};

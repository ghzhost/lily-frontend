import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, TimelineItem } from "./timeline";

const meta: Meta<typeof Timeline> = {
  title: "UI/Timeline",
  component: Timeline,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem date="Sep 5, 2026" title="Payment processed">
        Successfully processed $150 bounty payment for PR review agent implementation.
      </TimelineItem>
      <TimelineItem date="Sep 4, 2026" title="PR submitted">
        Submitted PR #557 with validation changes and tests.
      </TimelineItem>
      <TimelineItem date="Sep 3, 2026" title="Implementation complete">
        Completed the timeoutMs validation feature with full test coverage.
      </TimelineItem>
    </Timeline>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <Timeline>
      <TimelineItem 
        date="Sep 1, 2026" 
        title="Initial claim" 
        status="in-progress"
      >
        Claimed the bounty and forked the repository.
      </TimelineItem>
      <TimelineItem 
        date="Sep 6, 2026" 
        title="Live" 
        status="completed"
      >
        PR merged and payment received.
      </TimelineItem>
    </Timeline>
  ),
};

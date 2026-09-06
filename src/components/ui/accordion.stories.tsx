import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="What is Lily Protocol?">
        Lily Protocol is a payments and identity layer for AI agents.
      </AccordionItem>
      <AccordionItem title="How do I get started?">
        Install the SDK, configure your API key, and start making requests.
      </AccordionItem>
      <AccordionItem title="Is it compatible with EVM?">
        Yes, Lily Protocol supports EVM-compatible chains including Base.
      </AccordionItem>
    </Accordion>
  ),
};

export const FirstItemOpen: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Open by default" defaultOpen>
        This item is expanded by default, showing the accordion in its open state.
      </AccordionItem>
      <AccordionItem title="Second item">
        This item starts closed but can be expanded on click.
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Do you support BUSD?">
        Yes, BUSD BEP20 is supported as a payment currency alongside USDC on Base.
      </AccordionItem>
    </Accordion>
  ),
};
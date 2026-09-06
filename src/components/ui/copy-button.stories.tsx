import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from "./copy-button";

const meta: Meta<typeof CopyButton> = {
  title: "UI/CopyButton",
  component: CopyButton,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    text: "Payment address: 0x047b2A7fc72862a0e3E772eb53b19d35929BEd46",
    label: "Copy Address",
  },
};

export const WithCopiedLabel: Story = {
  args: {
    text: "0x1234abcd5678ef9012345678901234567890abcd",
    label: "Copy Wallet",
    copiedLabel: "Copied!",
  },
};

export const WithCustomLabels: Story = {
  args: {
    text: "https://github.com/Lilly-Protocol/lily-sdk/pull/557",
    label: "Copy PR Link",
    copiedLabel: "Link Copied",
    failedLabel: "Copy Failed",
  },
};

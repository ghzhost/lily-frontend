import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";

const meta: Meta<typeof FormField> = {
  title: "UI/FormField",
  component: FormField,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const WithError: Story = {
  args: {
    label: "Email Address",
    type: "email",
    error: "Please enter a valid email address",
  },
};

export const WithHint: Story = {
  args: {
    label: "Username",
    hint: "Your unique identifier for login",
  },
};

export const WithErrorAndHint: Story = {
  args: {
    label: "Password",
    type: "password",
    error: "Password must be at least 8 characters",
    hint: "Include uppercase, lowercase, and a number",
  },
};

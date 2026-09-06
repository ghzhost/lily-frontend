import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonText, SkeletonCard } from "./skeleton";

const meta: Meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
};
export default meta;

type SkeletonStory = StoryObj<typeof Skeleton>;
type SkeletonTextStory = StoryObj<typeof SkeletonText>;
type SkeletonCardStory = StoryObj<typeof SkeletonCard>;

export const Default: SkeletonStory = {};

export const TextVariant: SkeletonStory = { args: { variant: "text" } };

export const AvatarVariant: SkeletonStory = { args: { variant: "avatar" } };

export const CardVariant: SkeletonStory = { args: { variant: "card" } };

export const TextLines: SkeletonTextStory = {
  args: { lines: 3 },
};

export const Card: SkeletonCardStory = {};

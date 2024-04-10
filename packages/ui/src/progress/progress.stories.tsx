import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from ".";

const meta: Meta<typeof Progress> = {
  title: "Progress",
  component: Progress,
  args: {
    max: 100,
    value: 37,
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (props) => <Progress {...props} />,
};

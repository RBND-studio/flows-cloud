import { type Meta, type StoryObj } from "@storybook/react";

import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  args: {
    children: "Badge",
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (props) => <Badge {...props} />,
};

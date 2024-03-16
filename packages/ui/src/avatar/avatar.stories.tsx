import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "..";

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
  args: {
    fullName: "John Doe",
    src: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (props) => <Avatar {...props} />,
};

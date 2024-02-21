import { css } from "@flows/styled-system/css";
import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "Separator",
  component: Separator,
  args: {
    orientation: "horizontal",
    className: css({ my: "space8" }),
    decorative: false,
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: (props) => (
    <>
      <p>Above</p>
      <Separator {...props} />
      <p>Below</p>
    </>
  ),
};

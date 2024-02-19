import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "..";
import { Menu, MenuItem } from "./menu";

const meta: Meta<typeof Menu> = {
  title: "Menu",
  component: Menu,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: (props) => (
    <Menu {...props} trigger={<Button>Open menu</Button>}>
      <MenuItem>Flows</MenuItem>
      <MenuItem>Are</MenuItem>
      <MenuItem>Awesome</MenuItem>
    </Menu>
  ),
};

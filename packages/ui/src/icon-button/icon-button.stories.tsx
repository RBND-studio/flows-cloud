import { Flex } from "@flows/styled-system/jsx";
import type { Meta, StoryObj } from "@storybook/react";
import { Plus16 } from "icons";

import { Text } from "../text";
import { IconButton } from "./icon-button";

const meta: Meta<typeof IconButton> = {
  title: "Icon Button",
  component: IconButton,
  args: {
    size: "default",
    variant: "primary",
    children: <Plus16 />,
    tooltip: "Hello World!",
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (props) => <IconButton {...props} />,
};

const buttonVariants = {
  size: ["small", "default", "medium", "large"],
  variant: ["black", "primary", "secondary", "ghost", "danger"],
  shadow: ["default", "highlight"],
  disabled: [false, true],
} as const;

export const Grid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        justifyItems: "center",
        alignItems: "center",
        rowGap: 24,
        columnGap: 16,
      }}
    >
      {Object.values(buttonVariants.size).map((size) =>
        Object.values(buttonVariants.shadow).map((shadow) =>
          Object.values(buttonVariants.disabled).map((disabled) =>
            Object.values(buttonVariants.variant).map((variant) => (
              <Flex direction="column" gap="space12" alignItems="center" key={`${size}-${variant}`}>
                <IconButton
                  size={size}
                  variant={variant}
                  shadow={shadow}
                  disabled={disabled}
                  tooltip={variant}
                >
                  <Plus16 />
                </IconButton>
                <Text variant="bodyXs" color="muted" align="center">
                  {[size, shadow, disabled, variant].join(", ")}
                </Text>
              </Flex>
            )),
          ),
        ),
      )}
    </div>
  ),
};

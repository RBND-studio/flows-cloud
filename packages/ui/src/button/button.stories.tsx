import { Flex } from "@flows/styled-system/jsx";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown16, Plus16 } from "icons";

import { Text } from "../text";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  args: {
    size: "default",
    variant: "primary",
    children: "Hello World!",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (props) => <Button {...props} />,
};

const buttonVariants = {
  size: ["small", "default", "medium", "large"],
  variant: ["black", "primary", "secondary", "ghost", "danger", "field"],
  // eslint-disable-next-line react/jsx-key -- storybook
  startIcon: [null, <Plus16 />],
  // eslint-disable-next-line react/jsx-key -- storybook
  endIcon: [null, <ChevronDown16 />],
  shadow: ["default", "highlight"],
  disabled: [false, true],
} as const;

export const Grid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        justifyItems: "center",
        alignItems: "center",
        rowGap: 24,
        columnGap: 16,
      }}
    >
      {Object.values(buttonVariants.size).map((size) =>
        Object.values(buttonVariants.startIcon).map((startIcon) =>
          Object.values(buttonVariants.endIcon).map((endIcon) =>
            Object.values(buttonVariants.shadow).map((shadow) =>
              Object.values(buttonVariants.disabled).map((disabled) =>
                Object.values(buttonVariants.variant).map((variant) => (
                  <Flex
                    direction="column"
                    gap="space12"
                    alignItems="center"
                    key={`${size}-${variant}`}
                  >
                    <Button
                      key={`${size}-${variant}`}
                      startIcon={startIcon}
                      size={size}
                      variant={variant}
                      endIcon={endIcon}
                      shadow={shadow}
                      disabled={disabled}
                    >
                      {variant}
                    </Button>
                    <Text variant="bodyXs" color="muted" align="center">
                      {[size, shadow, disabled, variant].join(", ")}
                    </Text>
                  </Flex>
                )),
              ),
            ),
          ),
        ),
      )}
    </div>
  ),
};

"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Banner16, Comment16, Flows16, Hourglass16 } from "icons";
import Link from "next/link";
import { type FC } from "react";
import { type UseFieldArrayReturn } from "react-hook-form";
import { links } from "shared";
import { t } from "translations";
import { Button, Icon, Text } from "ui";

import { type IFlowEditForm } from "./edit-constants";
import { STEP_DEFAULT } from "./step-form";

type Props = {
  fieldArray: UseFieldArrayReturn<IFlowEditForm, "steps">;
};

export const EditFormEmpty: FC<Props> = ({ fieldArray }) => {
  return (
    <Flex
      maxWidth="560px"
      width="100%"
      flexDirection="column"
      margin="0 auto"
      px="space24"
      py="space48"
      gap="space24"
    >
      <Flex flexDirection="column" gap="space4">
        <Flex justifyContent="space-between">
          <Text variant="titleL">Create a Flow</Text>
          <Button asChild size="small" variant="secondary">
            <Link href={links.docs.stepsEditor} target="_blank">
              Learn
            </Link>
          </Button>
        </Flex>
        <Text color="muted">
          Flows are made up of steps that guide your users through a process.
        </Text>
      </Flex>
      <Flex flexDirection="column" gap="space8" width="100%">
        {[
          {
            label: t.steps.stepType.tooltip,
            icon: Comment16,
            value: STEP_DEFAULT.tooltip,
            description: "Show a tooltip with a message",
          },
          {
            label: t.steps.stepType.modal,
            icon: Flows16,
            value: STEP_DEFAULT.modal,
            description: "Show a modal with a message",
          },

          {
            label: t.steps.stepType.banner,
            icon: Banner16,
            value: STEP_DEFAULT.banner,
            description: "Show a banner with a message",
          },
          {
            label: t.steps.stepType.wait,
            icon: Hourglass16,
            value: STEP_DEFAULT.wait,
            description: "Wait for user to perform an action",
          },
        ].map((item) => (
          <button
            className={css({
              display: "flex",
              gap: "space8",

              bor: "1px",
              borderRadius: "radius12",
              padding: "space16",

              fastEaseInOut: "all",
              cursor: "pointer",
              background: "bg.card",

              _hover: {
                boxShadow: "l1",
                borderColor: "border.strong",
              },
            })}
            type="button"
            key={item.label}
            onClick={() => fieldArray.append(item.value)}
          >
            <Icon
              className={css({
                my: "2px",
              })}
              icon={item.icon}
            />
            <Flex flexDirection="column">
              <Text variant="titleS">{item.label}</Text>
              <Text color="muted" variant="bodyS">
                {item.description}
              </Text>
            </Flex>
          </button>
        ))}
      </Flex>
    </Flex>
  );
};

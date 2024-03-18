import { type FlowSteps } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { Close16, Comment16, Flows16, Hourglass16, Plus16 } from "icons";
import type { FC } from "react";
import { plural } from "translations";
import { Button, Icon, Menu, MenuItem, Text } from "ui";

import { useStepsForm } from "../edit-constants";
import { STEP_DEFAULT } from "../step-form";
import { boxConstants } from "./steps-flow.constants";

type AddItem = FlowSteps[number] | FlowSteps;

type Props = {
  index: number | `${number}.${number}.${number}`;
  onSelect: (index?: number | `${number}.${number}.${number}`) => void;
  selected: boolean;
  onRemove: () => void;
  onAddBefore: (step: AddItem) => void;
  onAddAfter: (step: AddItem) => void;
  lastStep: boolean;
};

const stepTypeIcon = {
  Tooltip: Comment16,
  Modal: Flows16,
  Wait: Hourglass16,
};

export const StepsFlowStep: FC<Props> = ({
  index,
  onSelect,
  selected,
  onRemove,
  onAddAfter,
  onAddBefore,
  lastStep,
}) => {
  const { watch } = useStepsForm();

  const fieldName = `steps.${index}` as const;
  const step = watch(fieldName);
  const title = (() => {
    if ("wait" in step) {
      const waitCount = Array.isArray(step.wait) ? step.wait.length : 1;
      return `${waitCount} ${plural(waitCount, "wait option", "wait options")}`;
    }
    if ("title" in step) return step.title;
    return "";
  })();
  const stepType = (() => {
    if ("targetElement" in step) return "Tooltip";
    if ("title" in step) return "Modal";
    return "Wait";
  })();

  const handleClick = (): void => onSelect(index);
  const handleRemove = (): void => {
    if (selected) onSelect();
    onRemove();
  };

  const rootStep = typeof index === "number";

  return (
    <Box _hover={{ "& .remove-button": { opacity: 1 } }} position="relative">
      <Flex
        _hover={{
          borderColor: selected ? "border.primary" : "border.strong",
          boxShadow: selected ? "focus" : "l2",
        }}
        backgroundColor="bg"
        bor="1px"
        borderColor={selected ? "border.primary" : "border"}
        borderRadius="radius8"
        boxShadow={selected ? "focus" : "l1"}
        cursor="pointer"
        fastEaseInOut="all"
        flexDirection="column"
        gap="space4"
        height="80px"
        justifyContent="center"
        onClick={handleClick}
        overflow="hidden"
        p="space16"
        position="relative"
        width={boxConstants.width}
      >
        <Flex alignItems="center" gap="space4">
          <Icon icon={stepTypeIcon[stepType]} />
          <Text variant="titleS">{stepType}</Text>
        </Flex>
        <Text
          className={css({
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "100%",
            whiteSpace: "nowrap",
          })}
          color="subtle"
          variant="bodyXs"
        >
          {title}
        </Text>
      </Flex>
      <Button
        className={`${css({
          position: "absolute",
          top: "-14px",
          right: "-13px",
          opacity: 0,
          zIndex: 1,
          _hover: { opacity: 1 },
        })} remove-button`}
        onClick={handleRemove}
        size="smallIcon"
        variant="secondary"
      >
        <Icon icon={Close16} />
      </Button>
      <AddButton onAdd={onAddBefore} variant="top" allowFork={rootStep} />
      {!(rootStep && lastStep) ? (
        <AddButton onAdd={onAddAfter} variant="bottom" allowFork={rootStep} />
      ) : null}
    </Box>
  );
};

const AddButton: FC<{
  onAdd: (step: AddItem) => void;
  variant: "top" | "bottom";
  allowFork?: boolean;
}> = ({ onAdd, variant, allowFork }) => {
  return (
    <Grid
      _hover={{ "& button": { opacity: 1 } }}
      alignItems={variant === "top" ? "flex-start" : "flex-end"}
      bottom={variant === "top" ? "100%" : undefined}
      h="36px"
      left={0}
      placeItems="center"
      position="absolute"
      right={0}
      top={variant === "bottom" ? "100%" : undefined}
    >
      <Menu
        trigger={
          <Button className={css({ opacity: 0 })} size="smallIcon" variant="secondary">
            <Icon icon={Plus16} />
          </Button>
        }
      >
        {[
          { label: "Tooltip", value: STEP_DEFAULT.tooltip },
          { label: "Modal", value: STEP_DEFAULT.modal },
          { label: "Wait", value: STEP_DEFAULT.wait },
          ...(allowFork ? [{ label: "Fork", value: [STEP_DEFAULT.fork] }] : []),
        ].map((item) => (
          <MenuItem key={item.label} onClick={() => onAdd(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

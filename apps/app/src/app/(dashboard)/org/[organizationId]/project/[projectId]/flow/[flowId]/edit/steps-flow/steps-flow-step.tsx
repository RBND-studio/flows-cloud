import { type FlowSteps } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { Banner16, Close16, Comment16, Flows16, Hourglass16, Plus16 } from "icons";
import type { FC } from "react";
import { plural, t } from "translations";
import { Icon, IconButton, Menu, MenuItem, Text } from "ui";

import { useFlowEditForm } from "../edit-constants";
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
  Banner: Banner16,
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
  const { watch } = useFlowEditForm();

  const fieldName = `steps.${index}` as const;
  const step = watch(fieldName);
  const title = (() => {
    if ("title" in step) return step.title;
    if ("wait" in step) {
      const waitCount = Array.isArray(step.wait) ? step.wait.length : 1;
      return `${waitCount} ${plural(waitCount, "wait option", "wait options")}`;
    }
    return "";
  })();
  const stepType = (() => {
    if ("targetElement" in step) return t.steps.stepType.tooltip;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- remove when all step have type
    if ("type" in step && step.type === "banner") return t.steps.stepType.banner;
    if ("title" in step) return t.steps.stepType.modal;
    return t.steps.stepType.wait;
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
        backgroundColor="bg.card"
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
      <IconButton
        className={`${css({
          position: "absolute",
          top: "-14px",
          right: "-13px",
          opacity: 0,
          zIndex: 1,
          _hover: { opacity: 1 },
        })} remove-button`}
        onClick={handleRemove}
        size="small"
        variant="secondary"
        tooltip="Remove step"
      >
        <Icon icon={Close16} />
      </IconButton>
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
          <IconButton
            tooltip="Add step"
            className={css({ opacity: 0 })}
            size="small"
            variant="secondary"
          >
            <Icon icon={Plus16} />
          </IconButton>
        }
      >
        {[
          { label: t.steps.stepType.tooltip, value: STEP_DEFAULT.tooltip },
          { label: t.steps.stepType.modal, value: STEP_DEFAULT.modal },
          { label: t.steps.stepType.banner, value: STEP_DEFAULT.banner },
          { label: t.steps.stepType.wait, value: STEP_DEFAULT.wait },
          ...(allowFork ? [{ label: t.steps.stepType.fork, value: [STEP_DEFAULT.fork] }] : []),
        ].map((item) => (
          <MenuItem key={item.label} onClick={() => onAdd(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

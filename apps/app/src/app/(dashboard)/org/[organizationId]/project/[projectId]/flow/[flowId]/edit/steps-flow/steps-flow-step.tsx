import { type FlowStep, type FlowSteps } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Grid } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { Button, Menu, MenuItem } from "ui";

import { useStepsForm } from "../edit-constants";
import { STEP_DEFAULT } from "../step-form";

type Props = {
  index: number | `${number}.${number}.${number}`;
  onSelect: (index?: number | `${number}.${number}.${number}`) => void;
  selected: boolean;
  onRemove: () => void;
  onAddBefore: (step: FlowSteps[number]) => void;
  onAddAfter: (step: FlowSteps[number]) => void;
};

export const StepsFlowStep: FC<Props> = ({
  index,
  onSelect,
  selected,
  onRemove,
  onAddAfter,
  onAddBefore,
}) => {
  const { watch } = useStepsForm();

  const fieldName = `steps.${index}` as const;
  const title = watch(`${fieldName}.title`);
  const handleClick = (): void => onSelect(index);
  const handleRemove = (): void => {
    if (selected) onSelect();
    onRemove();
  };

  return (
    <Box position="relative" _hover={{ "& .remove-button": { opacity: 1 } }}>
      <Box
        borderColor={selected ? "bg.primary" : undefined}
        cardWrap="-"
        cursor="pointer"
        fastEaseInOut="border-color"
        height="100px"
        onClick={handleClick}
        position="relative"
        width="120px"
      >
        {title}
      </Box>

      <Button
        onClick={handleRemove}
        size="small"
        variant="secondary"
        className={`${css({
          position: "absolute",
          top: "-14px",
          right: "-13px",
          opacity: 0,
          zIndex: 1,
          _hover: { opacity: 1 },
        })} remove-button`}
      >
        X
      </Button>
      <AddButton onAdd={onAddBefore} variant="top" />
      <AddButton onAdd={onAddAfter} variant="bottom" />
    </Box>
  );
};

const AddButton: FC<{ onAdd: (step: FlowStep) => void; variant: "top" | "bottom" }> = ({
  onAdd,
  variant,
}) => {
  return (
    <Grid
      placeItems="center"
      left={0}
      position="absolute"
      right={0}
      bottom={variant === "top" ? "100%" : undefined}
      top={variant === "bottom" ? "100%" : undefined}
      h="50px"
      _hover={{ "& button": { opacity: 1 } }}
    >
      <Menu
        trigger={
          <Button className={css({ opacity: 0 })} size="small" variant="secondary">
            +
          </Button>
        }
      >
        {[
          { label: "Tooltip", value: STEP_DEFAULT.tooltip },
          { label: "Modal", value: STEP_DEFAULT.modal },
          { label: "Wait", value: STEP_DEFAULT.wait },
        ].map((item) => (
          <MenuItem key={item.label} onClick={() => onAdd(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

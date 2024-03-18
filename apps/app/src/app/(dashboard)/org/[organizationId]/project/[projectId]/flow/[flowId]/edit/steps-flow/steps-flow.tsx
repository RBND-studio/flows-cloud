import { Flex, Grid } from "@flows/styled-system/jsx";
import { Plus16 } from "icons";
import { type FC, Fragment } from "react";
import { type UseFieldArrayReturn } from "react-hook-form";
import { t } from "translations";
import { Button, Menu, MenuItem } from "ui";

import { type IFlowEditForm, type SelectedItem, useFlowEditForm } from "../edit-constants";
import { STEP_DEFAULT } from "../step-form";
import { ConnectionArrow } from "./connection-arrow";
import { Fork } from "./fork";
import { StepsFlowStep } from "./steps-flow-step";

type Props = {
  selectedItem?: SelectedItem;
  onSelectItem: (item?: SelectedItem) => void;
  fieldArray: UseFieldArrayReturn<IFlowEditForm, "steps">;
};

export const StepsFlow: FC<Props> = ({ onSelectItem, selectedItem, fieldArray }) => {
  const { watch } = useFlowEditForm();
  const { fields, insert, append, remove } = fieldArray;
  const steps = watch("steps");

  return (
    <Flex alignItems="center" direction="column" px="space16" pt="space32" pb="space48">
      <Flex gap="space8" bor="1px" p="space12" borderRadius="radius8">
        {(
          [
            { value: "frequency", label: t.frequency.frequency },
            { value: "targeting", label: t.targeting.targeting },
            { value: "launch", label: t.launch.launch },
          ] as const
        ).map((item) => (
          <Button
            key={item.value}
            onClick={() => onSelectItem(item.value)}
            variant={selectedItem === item.value ? "primary" : "secondary"}
          >
            {item.label}
          </Button>
        ))}
      </Flex>
      <ConnectionArrow lines={1} variant="fork" />

      {fields.map((field, i) => {
        const step = steps.at(i);
        if (Array.isArray(step)) {
          return (
            <Fragment key={field.id}>
              {i !== 0 && <ConnectionArrow lines={step.length} variant="fork" />}
              <Fork
                index={i}
                onSelectStep={onSelectItem}
                selectedStep={selectedItem}
                onRemove={() => remove(i)}
              />
            </Fragment>
          );
        }

        const prevStep = steps.at(i - 1);
        const variant = Array.isArray(prevStep) ? "merge" : "fork";
        return (
          <Fragment key={field.id}>
            {i !== 0 && (
              <ConnectionArrow
                lines={variant === "merge" && Array.isArray(prevStep) ? prevStep.length : 1}
                variant={variant}
              />
            )}
            <StepsFlowStep
              index={i}
              onAddAfter={(s) => insert(i + 1, s)}
              onAddBefore={(s) => insert(i, s)}
              onSelect={onSelectItem}
              selected={i === selectedItem}
              lastStep={i === fields.length - 1}
              onRemove={() => remove(i)}
            />
          </Fragment>
        );
      })}

      <Grid h="48px" w="100%" mt="36px" left={0} placeItems="center" right={0}>
        <Menu
          trigger={
            <Button size="small" variant="secondary" startIcon={<Plus16 />}>
              Add step
            </Button>
          }
        >
          {[
            { label: "Tooltip", value: STEP_DEFAULT.tooltip },
            { label: "Modal", value: STEP_DEFAULT.modal },
            { label: "Wait", value: STEP_DEFAULT.wait },
            { label: "Fork", value: [STEP_DEFAULT.fork] },
          ].map((item) => (
            <MenuItem key={item.label} onClick={() => append(item.value)}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Flex>
  );
};

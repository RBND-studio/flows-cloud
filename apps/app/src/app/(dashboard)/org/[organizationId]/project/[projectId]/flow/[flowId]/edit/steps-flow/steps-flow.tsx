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
import { StartConditions } from "./start-conditions";
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
    <Flex alignItems="center" direction="column" px="space16" pt="space24" pb="space48">
      <StartConditions onSelectItem={onSelectItem} selectedItem={selectedItem} />
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
            { label: t.steps.stepType.tooltip, value: STEP_DEFAULT.tooltip },
            { label: t.steps.stepType.modal, value: STEP_DEFAULT.modal },
            { label: t.steps.stepType.banner, value: STEP_DEFAULT.banner },
            { label: t.steps.stepType.wait, value: STEP_DEFAULT.wait },
            { label: t.steps.stepType.fork, value: [STEP_DEFAULT.fork] },
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

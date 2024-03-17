import { Flex, Grid } from "@flows/styled-system/jsx";
import { Plus16 } from "icons";
import { type FC, Fragment } from "react";
import { type UseFieldArrayReturn } from "react-hook-form";
import { Button, Menu, MenuItem } from "ui";

import { type StepsForm, useStepsForm } from "../edit-constants";
import { STEP_DEFAULT } from "../step-form";
import { ConnectionArrow } from "./connection-arrow";
import { Fork } from "./fork";
import { StepsFlowStep } from "./steps-flow-step";

type Props = {
  selectedStep?: number | `${number}.${number}.${number}`;
  onSelectStep: (index: number | `${number}.${number}.${number}`) => void;
  fieldArray: UseFieldArrayReturn<StepsForm, "steps">;
};

export const StepsFlow: FC<Props> = ({ onSelectStep, selectedStep, fieldArray }) => {
  const { watch } = useStepsForm();
  const { fields, insert, append, remove } = fieldArray;
  const steps = watch("steps");

  return (
    <Flex alignItems="center" direction="column" px="space16" py="space48">
      {fields.map((field, i) => {
        const step = steps.at(i);
        if (Array.isArray(step)) {
          return (
            <Fragment key={field.id}>
              {i !== 0 && <ConnectionArrow lines={step.length} variant="fork" />}
              <Fork
                index={i}
                onSelectStep={onSelectStep}
                selectedStep={selectedStep}
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
              onSelect={onSelectStep}
              selected={i === selectedStep}
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

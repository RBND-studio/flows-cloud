import { css } from "@flows/styled-system/css";
import { Flex, Grid } from "@flows/styled-system/jsx";
import { Plus16 } from "icons";
import { type FC, Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import { Button, Icon, Menu, MenuItem } from "ui";

import { useStepsForm } from "../edit-constants";
import { STEP_DEFAULT } from "../step-form";
import { ConnectionArrow } from "./connection-arrow";
import { Fork } from "./fork";
import { StepsFlowStep } from "./steps-flow-step";

type Props = {
  selectedStep?: number | `${number}.${number}.${number}`;
  onSelectStep: (index: number | `${number}.${number}.${number}`) => void;
};

export const StepsFlow: FC<Props> = ({ onSelectStep, selectedStep }) => {
  const { control, watch } = useStepsForm();
  const { fields, insert, append, remove } = useFieldArray({ control, name: "steps" });
  const steps = watch("steps");

  return (
    <Flex alignItems="center" direction="column" px="space16" py="space48">
      {fields.map((field, i) => {
        const step = steps.at(i);
        if (Array.isArray(step)) {
          return (
            <Fragment key={field.id}>
              {i !== 0 && <ConnectionArrow lines={step.length} variant="fork" />}
              <Fork index={i} onSelectStep={onSelectStep} selectedStep={selectedStep} />
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
              // insert method takes item or array of items. Since our item can be array we need to wrap it in another array.
              onAddAfter={(s) => insert(i + 1, Array.isArray(s) ? [s] : s)}
              onAddBefore={(s) => insert(i, Array.isArray(s) ? [s] : s)}
              onSelect={onSelectStep}
              selected={i === selectedStep}
              lastStep={i === fields.length - 1}
              onRemove={() => remove(i)}
            />
          </Fragment>
        );
      })}

      <Grid
        _hover={{ "& button": { opacity: 1 } }}
        h="48px"
        w="100%"
        mt="36px"
        left={0}
        placeItems="center"
        right={0}
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

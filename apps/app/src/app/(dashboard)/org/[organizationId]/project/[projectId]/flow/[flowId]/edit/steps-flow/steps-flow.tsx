import { Flex } from "@flows/styled-system/jsx";
import { type FC, Fragment } from "react";
import { useFieldArray } from "react-hook-form";

import { useStepsForm } from "../edit-constants";
import { ConnectionArrow } from "./connection-arrow";
import { Fork } from "./fork";
import { StepsFlowStep } from "./steps-flow-step";

type Props = {
  selectedStep?: number | `${number}.${number}.${number}`;
  onSelectStep: (index: number | `${number}.${number}.${number}`) => void;
};

export const StepsFlow: FC<Props> = ({ onSelectStep, selectedStep }) => {
  const { control, watch } = useStepsForm();
  const { fields, remove, insert } = useFieldArray({ control, name: "steps" });
  const steps = watch("steps");

  return (
    <Flex alignItems="center" direction="column">
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
              onAddAfter={(s) => insert(i + 1, s)}
              onAddBefore={(s) => insert(i, s)}
              onRemove={() => remove(i)}
              onSelect={onSelectStep}
              selected={i === selectedStep}
            />
          </Fragment>
        );
      })}
    </Flex>
  );
};

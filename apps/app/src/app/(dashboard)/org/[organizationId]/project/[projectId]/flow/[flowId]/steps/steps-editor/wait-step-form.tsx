import type { FlowWaitStep } from "@flows/js";
import { Box } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { t } from "translations";
import { Accordion, Input } from "ui";

import { StepWaitOptionList } from "./step-wait-option-list";
import { useStepsForm } from "./steps-editor.types";

type Props = {
  index: number | `${number}.${number}.${number}`;
};

export const WaitStepForm: FC<Props> = ({ index }) => {
  const { register, getValues } = useStepsForm();
  const stepKey = `steps.${index}` as const;

  const initialValue = getValues(stepKey) as FlowWaitStep;

  return (
    <>
      <Box mb="space16">
        <StepWaitOptionList fieldName={`${stepKey}.wait`} />
      </Box>

      <Accordion title="Advanced">
        <Input
          {...register(`${stepKey}.stepId`)}
          defaultValue={initialValue.stepId}
          description={t.steps.stepIdDescription}
          label={t.steps.stepIdLabel}
          placeholder="my-step-id"
        />
      </Accordion>
    </>
  );
};

import type { FlowModalStep } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { Controller } from "react-hook-form";
import { t } from "translations";
import { Accordion, Checkbox, Input } from "ui";

import { StepFooter } from "./step-footer";
import { StepWaitOptionList } from "./step-wait-option-list";
import { useStepsForm } from "./steps-editor.types";

type Props = {
  index: number | `${number}.${number}.${number}`;
};

export const ModalStepForm: FC<Props> = ({ index }) => {
  const { getValues, register, control } = useStepsForm();
  const stepKey = `steps.${index}` as const;

  const initialValue = getValues(stepKey) as FlowModalStep;

  return (
    <>
      <Input
        {...register(`${stepKey}.title`)}
        defaultValue={initialValue.title}
        description="HTML title of the modal"
        label="Title"
      />
      <Input
        {...register(`${stepKey}.body`)}
        asChild
        className={css({ mb: "space16" })}
        defaultValue={initialValue.body}
        description="HTML content of the modal"
        inputClassName={css({ height: "unset" })}
        label="Body"
      >
        <textarea rows={5} />
      </Input>

      <Controller
        control={control}
        name={`${stepKey}.hideClose`}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            className={css({ mb: "space16" })}
            label="Hide close button"
            onCheckedChange={field.onChange}
          />
        )}
      />
      <Flex flexDirection="column" gap="space8">
        <StepFooter index={index} />

        <Accordion title="Wait">
          <StepWaitOptionList fieldName={`${stepKey}.wait`} />
        </Accordion>

        <Accordion title="Advanced">
          <Input
            {...register(`${stepKey}.stepId`)}
            defaultValue={initialValue.stepId}
            description={t.steps.stepIdDescription}
            label={t.steps.stepIdLabel}
            placeholder="my-step-id"
          />
        </Accordion>
      </Flex>
    </>
  );
};

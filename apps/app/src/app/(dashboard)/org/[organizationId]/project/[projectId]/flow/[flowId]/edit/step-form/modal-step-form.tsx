import type { FlowModalStep } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { Controller } from "react-hook-form";
import { t } from "translations";
import { Accordion, Checkbox, Input } from "ui";

import { useStepsForm } from "../edit-constants";
import { StepFooter } from "./step-footer";
import { StepWaitOptionList } from "./step-wait-option-list";

type Props = {
  index: number | `${number}.${number}.${number}`;
};

export const ModalStepForm: FC<Props> = ({ index }) => {
  const { getValues, register, control } = useStepsForm();
  const stepKey = `steps.${index}` as const;

  const initialValue = getValues(stepKey) as FlowModalStep;

  return (
    <>
      <Flex gap="space24" flexDirection="column" mb="space16">
        <Box>
          <Input
            {...register(`${stepKey}.title`)}
            defaultValue={initialValue.title}
            description="HTML title of the modal"
            label="Title"
          />
          <Input
            {...register(`${stepKey}.body`)}
            asChild
            defaultValue={initialValue.body}
            description="HTML content of the modal"
            inputClassName={css({ height: "unset!" })}
            label="Body"
          >
            <textarea rows={5} />
          </Input>
        </Box>

        <Flex flexDirection="column" gap="space8">
          <Controller
            control={control}
            name={`${stepKey}.hideClose`}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                label="Hide close button"
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={`${stepKey}.hideOverlay`}
            render={({ field }) => (
              <>
                <Checkbox
                  checked={field.value}
                  label="Hide overlay"
                  onCheckedChange={field.onChange}
                />
                {!field.value ? (
                  <Controller
                    control={control}
                    name={`${stepKey}.closeOnOverlayClick`}
                    render={({ field: closeField }) => (
                      <Checkbox
                        checked={closeField.value}
                        label="Close on overlay click"
                        onCheckedChange={closeField.onChange}
                      />
                    )}
                  />
                ) : null}
              </>
            )}
          />
        </Flex>
      </Flex>
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

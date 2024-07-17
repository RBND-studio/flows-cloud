import { type FlowBannerStep } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { type FC } from "react";
import { Controller } from "react-hook-form";
import { t } from "translations";
import { Accordion, Checkbox, Input, Select } from "ui";

import { useFlowEditForm } from "../edit-constants";
import { StepFooter } from "./step-footer";
import { StepWaitAccordion } from "./step-wait-accordion";

type Props = {
  index: number | `${number}.${number}.${number}`;
};

const positionOptions = ["top-left", "top-right", "bottom-left", "bottom-right"].map((value) => ({
  label: t.steps.bannerPosition[value],
  value,
}));

export const BannerStepForm: FC<Props> = ({ index }) => {
  const { getValues, register, control } = useFlowEditForm();
  const stepKey = `steps.${index}` as const;

  const initialValue = getValues(stepKey) as FlowBannerStep;

  return (
    <>
      <Flex gap="space24" flexDirection="column" mb="space16">
        <Box>
          <Input
            {...register(`${stepKey}.title`)}
            defaultValue={initialValue.title}
            description="HTML title of the modal"
            className={css({ mb: "space16" })}
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

        <Controller
          control={control}
          name={`${stepKey}.bannerPosition`}
          render={({ field }) => (
            <Select
              buttonSize="default"
              description="Position of the banner on the screen"
              label="Banner position"
              onChange={field.onChange}
              options={positionOptions}
              value={field.value ?? "bottom-right"}
            />
          )}
        />

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
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap="space8">
        <StepFooter index={index} />

        <StepWaitAccordion fieldName={`${stepKey}.wait`} />

        <Accordion title="Advanced">
          <Input
            {...register(`${stepKey}.stepId`)}
            className={css({ mb: "space16" })}
            defaultValue={initialValue.stepId}
            description={t.steps.stepIdDescription}
            label={t.steps.stepIdLabel}
            placeholder="my-step-id"
          />

          <Input
            {...register(`${stepKey}.zIndex`)}
            defaultValue={initialValue.zIndex}
            label="Banner z-index"
            description="Z-index of the banner element"
            placeholder="e.g. 1000"
          />
        </Accordion>
      </Flex>
    </>
  );
};

import type { FlowTooltipStep } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { type FC } from "react";
import { Controller } from "react-hook-form";
import { t } from "translations";
import { Accordion, Checkbox, Input, Select } from "ui";

import { StepFooter } from "./step-footer";
import { StepWaitOptionList } from "./step-wait-option-list";
import { useStepsForm } from "./steps-editor.types";

type Props = {
  index: number | `${number}.${number}.${number}`;
};

const placementOptions = [
  "top",
  "right",
  "bottom",
  "left",
  "top-start",
  "top-end",
  "right-start",
  "right-end",
  "bottom-start",
  "bottom-end",
  "left-start",
  "left-end",
].map((value) => ({ label: t.steps.placement[value], value }));

// TODO: maybe add checkbox that will show/hide the custom actions section

export const TooltipStepForm: FC<Props> = ({ index }) => {
  const { control, getValues, register } = useStepsForm();
  const stepKey = `steps.${index}` as const;

  const initialValue = getValues(stepKey) as FlowTooltipStep;

  return (
    <>
      <Grid gap="space24" gridTemplateColumns="2fr 1fr" mb="space16">
        <Box>
          <Box>
            <Input
              {...register(`${stepKey}.title`)}
              className={css({ mb: "space16" })}
              defaultValue={initialValue.title}
              description="HTML title of the tooltip"
              label="Title"
            />
            <Input
              {...register(`${stepKey}.body`)}
              asChild
              defaultValue={initialValue.body}
              description="HTML content of the tooltip"
              inputClassName={css({ height: "unset" })}
              label="Body"
            >
              <textarea rows={5} />
            </Input>
          </Box>
        </Box>

        <Box>
          <Input
            {...register(`${stepKey}.targetElement`)}
            className={css({ mb: "space16" })}
            defaultValue={initialValue.targetElement}
            description="Element to attach tooltip to"
            label="Target element"
            placeholder=".element"
          />
          <Controller
            control={control}
            name={`${stepKey}.placement`}
            render={({ field }) => (
              <Select
                buttonSize="default"
                className={css({ mb: "space16" })}
                description="Placement of the tooltip relative to the element"
                label="Tooltip placement"
                onChange={field.onChange}
                options={placementOptions}
                value={field.value ?? "bottom"}
              />
            )}
          />
          <Flex flexDirection="column" gap="space8">
            {(
              [
                { key: "hideClose", label: "Hide close button" },
                {
                  key: "hideArrow",
                  label: "Hide arrow",
                },
              ] as const
            ).map(({ key, label }) => (
              <Controller
                control={control}
                key={key}
                name={`${stepKey}.${key}`}
                render={({ field }) => (
                  <Checkbox checked={field.value} label={label} onCheckedChange={field.onChange} />
                )}
              />
            ))}

            <Controller
              control={control}
              name={`${stepKey}.overlay`}
              render={({ field }) => (
                <>
                  <Checkbox
                    checked={field.value}
                    label="Show overlay"
                    onCheckedChange={field.onChange}
                  />
                  {field.value ? (
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
        </Box>
      </Grid>

      <Flex flexDirection="column" gap="space8">
        <StepFooter index={index} />

        <Accordion title="Wait">
          <StepWaitOptionList fieldName={`${stepKey}.wait`} />
        </Accordion>

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
            {...register(`${stepKey}.scrollElement`)}
            defaultValue={initialValue.scrollElement}
            description="Element to scroll to when tooltip is shown"
            label="Scroll to element"
            placeholder=".element"
          />
        </Accordion>
      </Flex>
    </>
  );
};

import type { FlowModalStep, FlowTooltipStep } from "@flows/js";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { Controller } from "react-hook-form";
import { Accordion, Checkbox, Input, Label, Text } from "ui";

import { useStepsForm } from "../edit-constants";
import { StepFooterActions } from "./step-footer-actions";

type Props = {
  index: number | `${number}.${number}.${number}`;
};

export const StepFooter: FC<Props> = ({ index }) => {
  const { register, control, watch } = useStepsForm();
  const stepKey = `steps.${index}` as const;
  const value = watch(stepKey) as FlowTooltipStep | FlowModalStep;

  return (
    <Accordion title="Footer">
      <Grid gap="space16" gridTemplateColumns="1fr 1fr" mb="space16">
        <Box>
          <Flex justifyContent="space-between" mb="space4">
            <Label htmlFor={`${stepKey}.prevText`}>Previous step button</Label>
            <Controller
              control={control}
              name={`${stepKey}.hidePrev`}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  label="Hide button"
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </Flex>
          <Input
            {...register(`${stepKey}.prevLabel`)}
            defaultValue={value.prevLabel}
            description="Replace default text of the previous step button"
            disabled={value.hidePrev}
            id={`${stepKey}.prevText`}
            placeholder="Back"
          />
        </Box>

        <Box>
          <Flex justifyContent="space-between" mb="space4">
            <Label htmlFor={`${stepKey}.nextText`}>Next step button</Label>
            <Controller
              control={control}
              name={`${stepKey}.hideNext`}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  label="Hide button"
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </Flex>

          <Input
            {...register(`${stepKey}.nextLabel`)}
            defaultValue={value.nextLabel}
            description="Replace default text of the next or finish button"
            disabled={value.hideNext}
            id={`${stepKey}.nextText`}
            placeholder="Continue or Finish"
          />
        </Box>
      </Grid>

      <Flex flexDirection="column" mb="space8">
        <Text variant="titleS">Custom actions</Text>
        <Text color="muted" variant="bodyS">
          Add custom actions to the footer of the tooltip
        </Text>
      </Flex>
      <Flex gap="space16" flexDirection="column">
        <StepFooterActions index={index} placement="left" />
        <StepFooterActions index={index} placement="center" />
        <StepFooterActions index={index} placement="right" />
      </Flex>
    </Accordion>
  );
};

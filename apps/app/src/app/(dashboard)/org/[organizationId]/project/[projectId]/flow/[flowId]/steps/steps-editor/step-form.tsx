import type { FlowModalStep, FlowSteps, FlowTooltipStep, FlowWaitStep } from "@flows/js";
import { Flex } from "@flows/styled-system/jsx";
import { type FC, useMemo } from "react";
import { type Control, useController } from "react-hook-form";
import { t } from "translations";
import { Accordion, Button, Select, Text } from "ui";

import { ModalStepForm } from "./modal-step-form";
import type { StepsForm } from "./steps-editor.types";
import { TooltipStepForm } from "./tooltip-step-form";
import { WaitStepForm } from "./wait-step-form";

type Props = {
  control: Control<StepsForm>;
  index: number | `${number}.${number}.${number}`;
  onRemove: () => void;
};

const DEFAULT_TOOLTIP: FlowTooltipStep = { targetElement: "", title: "" };
const DEFAULT_MODAL: FlowModalStep = { title: "" };
const DEFAULT_WAIT: FlowWaitStep = { wait: {} };
const FORK_DEFAULT: FlowSteps[number] = [[]];
export const STEP_DEFAULT = {
  tooltip: DEFAULT_TOOLTIP,
  modal: DEFAULT_MODAL,
  wait: DEFAULT_WAIT,
  fork: FORK_DEFAULT,
};

export const StepForm: FC<Props> = ({ control, index, onRemove }) => {
  const stepKey = `steps.${index}` as const;

  const { field } = useController({ name: `${stepKey}`, control });

  const stepType =
    // eslint-disable-next-line no-nested-ternary -- ignore
    "targetElement" in field.value ? "tooltip" : "title" in field.value ? "modal" : "wait";

  const typeOptions = useMemo(
    () =>
      Object.keys(STEP_DEFAULT).map((value) => ({
        value,
        label: t.steps.stepType[value],
      })),
    [],
  );

  return (
    <Accordion
      title={
        <Flex alignItems="center" gap="space8">
          <Text variant="titleM">{t.steps.stepType[stepType]}</Text>
          <Text color="subtle" variant="bodyS">
            {index}
          </Text>
        </Flex>
      }
    >
      <Flex mb="space12">
        <Flex alignItems="center" flex={1} gap="space4">
          <Select
            onChange={(v) => field.onChange(STEP_DEFAULT[v])}
            options={typeOptions}
            value={stepType}
          />
        </Flex>
        <Button onClick={onRemove} shadow={false} size="small" variant="secondary">
          Remove step
        </Button>
      </Flex>

      {stepType === "tooltip" && <TooltipStepForm control={control} index={index} />}
      {stepType === "modal" && <ModalStepForm control={control} index={index} />}
      {stepType === "wait" && <WaitStepForm control={control} index={index} />}
    </Accordion>
  );
};

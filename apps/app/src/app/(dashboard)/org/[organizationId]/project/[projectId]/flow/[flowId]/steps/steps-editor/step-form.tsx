import type { FlowModalStep, FlowSteps, FlowTooltipStep, FlowWaitStep } from "@flows/js";
import { Flex } from "@flows/styled-system/jsx";
import { type FC, useMemo } from "react";
import { t } from "translations";
import { Accordion, Button, Select, Text } from "ui";

import { ModalStepForm } from "./modal-step-form";
import { useStepsForm } from "./steps-editor.types";
import { TooltipStepForm } from "./tooltip-step-form";
import { WaitStepForm } from "./wait-step-form";

type Props = {
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

export const StepForm: FC<Props> = ({ index, onRemove }) => {
  const { watch, setValue } = useStepsForm();
  const stepKey = `steps.${index}` as const;

  const stepValue = watch(stepKey);

  const stepType =
    // eslint-disable-next-line no-nested-ternary -- ignore
    "targetElement" in stepValue ? "tooltip" : "title" in stepValue ? "modal" : "wait";

  const typeOptions = useMemo(
    () =>
      (["tooltip", "modal", "wait"] as const).map((value) => ({
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
            onChange={(v) => setValue(stepKey, STEP_DEFAULT[v])}
            options={typeOptions}
            value={stepType}
          />
        </Flex>
        <Button onClick={onRemove} shadow={false} size="small" variant="secondary">
          Remove step
        </Button>
      </Flex>

      {stepType === "tooltip" && <TooltipStepForm index={index} />}
      {stepType === "modal" && <ModalStepForm index={index} />}
      {stepType === "wait" && <WaitStepForm index={index} />}
    </Accordion>
  );
};

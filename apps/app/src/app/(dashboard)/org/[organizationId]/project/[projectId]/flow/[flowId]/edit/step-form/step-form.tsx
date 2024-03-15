import type { FlowModalStep, FlowSteps, FlowTooltipStep, FlowWaitStep } from "@flows/js";
import { Flex } from "@flows/styled-system/jsx";
import { type FC } from "react";
import { t } from "translations";
import { Button, Text } from "ui";

import { useStepsForm } from "../edit-constants";
import { ModalStepForm } from "./modal-step-form";
import { TooltipStepForm } from "./tooltip-step-form";
import { WaitStepForm } from "./wait-step-form";

type Props = {
  index: number | `${number}.${number}.${number}`;
};

const DEFAULT_TOOLTIP: FlowTooltipStep = {
  targetElement: "",
  title: "Tooltip Title",
  body: "Lorem ipsum dolor sit..",
  overlay: true,
};
const DEFAULT_MODAL: FlowModalStep = { title: "Modal Title", body: "Lorem ipsum dolor sit.." };
const DEFAULT_WAIT: FlowWaitStep = { wait: {} };
const FORK_DEFAULT: FlowSteps[number] = [[]];
export const STEP_DEFAULT = {
  tooltip: DEFAULT_TOOLTIP,
  modal: DEFAULT_MODAL,
  wait: DEFAULT_WAIT,
  fork: FORK_DEFAULT,
};

export const StepForm: FC<Props> = ({ index }) => {
  const { watch } = useStepsForm();
  const stepKey = `steps.${index}` as const;

  const stepValue = watch(stepKey);

  const stepType =
    "targetElement" in stepValue ? "tooltip" : "title" in stepValue ? "modal" : "wait";

  return (
    <>
      <Flex gap="space16" justifyContent="space-between" mb="space12">
        <Flex alignItems="center" gap="space8">
          <Text variant="titleM">{t.steps.stepType[stepType]}</Text>
          <Text color="subtle" variant="bodyS">
            {index}
          </Text>
        </Flex>
        <Button size="small" variant="secondary">
          Remove
        </Button>
      </Flex>

      {stepType === "tooltip" && <TooltipStepForm index={index} />}
      {stepType === "modal" && <ModalStepForm index={index} />}
      {stepType === "wait" && <WaitStepForm index={index} />}
    </>
  );
};

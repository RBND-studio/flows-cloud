import type { FlowModalStep, FlowSteps, FlowTooltipStep, FlowWaitStep } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { ChevronDown16 } from "icons";
import { type FC, useMemo } from "react";
import { t } from "translations";
import { Icon, Menu, MenuItem, Text } from "ui";

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
const DEFAULT_WAIT: FlowWaitStep = { wait: [] };
const FORK_DEFAULT: FlowSteps[number] = [[DEFAULT_TOOLTIP]];
export const STEP_DEFAULT = {
  tooltip: DEFAULT_TOOLTIP,
  modal: DEFAULT_MODAL,
  wait: DEFAULT_WAIT,
  fork: FORK_DEFAULT,
};

export const StepForm: FC<Props> = ({ index }) => {
  const { watch, setValue } = useStepsForm();
  const stepKey = `steps.${index}` as const;

  const stepValue = watch(stepKey);

  const stepType =
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
    <>
      <Flex gap="space16" justifyContent="space-between" mb="space12">
        <Flex alignItems="center" gap="space16" ml="-space8">
          <Menu
            trigger={
              <button
                type="button"
                className={css({
                  display: "flex",
                  alignItems: "center",
                  gap: "space4",
                  py: "space4",
                  px: "space8",
                  borderRadius: "radius8",
                  cursor: "pointer",
                  _hover: { backgroundColor: "bg.hover" },
                })}
              >
                <Text variant="titleM">{t.steps.stepType[stepType]}</Text>{" "}
                <Icon icon={ChevronDown16} />
              </button>
            }
          >
            {typeOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => setValue(stepKey, STEP_DEFAULT[option.value])}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
          <Text color="subtle" variant="bodyS">
            {index}
          </Text>
        </Flex>
      </Flex>

      {stepType === "tooltip" && <TooltipStepForm index={index} />}
      {stepType === "modal" && <ModalStepForm index={index} />}
      {stepType === "wait" && <WaitStepForm index={index} />}
    </>
  );
};

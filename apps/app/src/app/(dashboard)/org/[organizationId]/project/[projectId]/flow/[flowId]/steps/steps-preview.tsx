"use client";

import "@rbnd/flows/flows.css";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FlowStep, FlowSteps } from "@rbnd/flows";
import { endFlow, getCurrentStep, init, nextStep, startFlow } from "@rbnd/flows";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

import { StepTile } from "./step-tile";

type Props = {
  steps?: FlowSteps;
};

export const StepsPreview: FC<Props> = ({ steps }) => {
  const [stepIndex, setStepIndex] = useState<number | number[]>(0);
  const [currentStep, setCurrentStep] = useState<FlowStep | null>();

  useEffect(() => {
    if (!steps) return;
    init({
      flows: [
        {
          id: "flow",
          steps: prepareSteps(steps),
        },
      ],
      rootElement: "#preview-root",
    });
    startFlow("flow");

    if (!Array.isArray(stepIndex)) {
      for (let i = 0; i < stepIndex; i++) {
        nextStep("flow");
      }
    } else {
      for (let i = 0; i < stepIndex[0]; i++) {
        const isLast = i === stepIndex[0] - 1;
        nextStep("flow", isLast ? stepIndex[1] : undefined);
      }
      for (let i = 0; i < stepIndex[2]; i++) {
        nextStep("flow");
      }
    }
    setCurrentStep(getCurrentStep("flow"));

    return () => endFlow("flow");
  }, [stepIndex, steps]);

  const tooltipPlacement = useMemo(() => {
    if (!currentStep) return;
    if (!("element" in currentStep)) return;
    return "placement" in currentStep ? currentStep.placement : "bottom";
  }, [currentStep]);
  const targetPosition = useMemo(() => {
    if (!tooltipPlacement) return;
    if (tooltipPlacement.includes("bottom")) return { top: 16 };
    if (tooltipPlacement.includes("top")) return { bottom: 16, top: "unset" };
    if (tooltipPlacement.includes("left")) return { right: 16, left: "unset" };
    if (tooltipPlacement.includes("right")) return { left: 16 };
  }, [tooltipPlacement]);

  return (
    <>
      <Flex alignItems="center" gap="space8" minHeight="48px">
        {steps?.map((s, i) => (
          <StepTile
            activeIndex={stepIndex}
            index={i}
            // eslint-disable-next-line react/no-array-index-key -- there's no better key
            key={i}
            onClick={setStepIndex}
            step={s as FlowStep}
          />
        ))}
      </Flex>

      <div
        className={css({
          height: "380px",
          position: "relative",
          backgroundColor: "bg.muted",
          bor: "1px",
          borderRadius: "radius12",
          overflow: "hidden",
          transform: "translate3d(0,0,0)",
          mt: "space16",
        })}
        id="preview-root"
      >
        {tooltipPlacement ? (
          <div
            className={css({
              height: "16px",
              width: "16px",
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "border.strong",
              borderRadius: "radius100",
              backgroundColor: "bg.subtle",
              position: "absolute",
              left: "calc(50% - 8px)",
              top: "calc(50% - 8px)",
            })}
            id="preview-target"
            style={targetPosition}
          />
        ) : null}
      </div>
    </>
  );
};

const prepareSteps = (steps: FlowSteps): FlowSteps =>
  steps.map((s) => {
    if (Array.isArray(s)) return s.map((ss) => prepareSteps(ss) as FlowStep[]);

    const step = { ...s };
    if ("element" in step) step.element = "#preview-target";
    return step;
  });

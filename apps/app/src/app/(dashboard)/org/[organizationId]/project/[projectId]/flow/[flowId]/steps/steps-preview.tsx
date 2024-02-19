"use client";

import "@flows/js/flows.css";

import type { FlowStep, FlowSteps } from "@flows/js";
import { endFlow, getCurrentStep, init, nextStep, startFlow } from "@flows/js/core";
import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

import { StepTile } from "./step-tile";

type Props = {
  steps?: FlowSteps;
};

export const StepsPreview: FC<Props> = ({ steps }) => {
  const [stepIndex, setStepIndex] = useState<number | number[]>(0);
  const [currentStep, setCurrentStep] = useState<FlowStep | null>();

  const stepsJson = JSON.stringify(steps);
  useEffect(() => {
    if (!steps) return;
    void init({
      flows: [{ id: "flow", steps: prepareSteps(steps) }],
      rootElement: "#preview-root",
    }).then(() => {
      startFlow("flow");

      if (!Array.isArray(stepIndex)) {
        for (let i = 0; i < stepIndex; i++) {
          nextStep("flow");
        }
      } else if (stepIndex.length === 3) {
        for (let i = 0; i < stepIndex[0]; i++) {
          const isLast = i === stepIndex[0] - 1;
          nextStep("flow", isLast ? stepIndex[1] : undefined);
        }
        for (let i = 0; i < stepIndex[2]; i++) {
          nextStep("flow");
        }
      }
      setCurrentStep(getCurrentStep("flow"));
    });

    return () => endFlow("flow");
  }, [
    stepIndex,
    steps,
    // We need to watch for changes in nested objects, hence the JSON.stringify
    stepsJson,
  ]);

  const tooltipPlacement = useMemo(() => {
    if (!currentStep) return;
    if (!("targetElement" in currentStep)) return;
    return currentStep.placement ?? "bottom";
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
          cardWrap: "-",
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
    if ("targetElement" in step) step.targetElement = "#preview-target";
    return step;
  });

import type { FlowStep } from "@flows/js/core";
import { renderModalElement, renderTooltipElement, updateTooltip } from "@flows/js/core";
import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { useFetch } from "hooks/use-fetch";
import { useParams } from "next/navigation";
import { type FC, useEffect, useMemo, useRef } from "react";

import { useStepsForm } from "./edit-constants";

type Props = {
  selectedStep?: number | `${number}.${number}.${number}`;
};

export const StepPreview: FC<Props> = ({ selectedStep }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project, isLoading: projectIsLoading } = useFetch("/projects/:projectId", [
    projectId,
  ]);
  const { data: vars, isLoading: varsIsLoading } = useFetch("/css/vars");
  const { data: template, isLoading: templateIsLoading } = useFetch("/css/template");
  const loading = projectIsLoading || varsIsLoading || templateIsLoading;
  const cssStyle = useMemo(
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing is not suitable here
    () => [project?.css_vars || vars, project?.css_template || template].join(""),
    [project?.css_template, project?.css_vars, template, vars],
  );

  const { watch } = useStepsForm();
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const steps = watch("steps");

  useEffect(() => {
    const root = rootRef.current;
    const target = targetRef.current;
    if (loading || selectedStep === undefined || !root || !target) return;
    const step = (
      typeof selectedStep === "string" ? selectedStep.split(".").map(Number) : [selectedStep]
    ).reduce((acc, index): unknown => acc[index], steps) as FlowStep;
    target.style.display = "none";

    if (!("title" in step)) return;
    let renderEl: HTMLElement | undefined;
    const isFirstStep = selectedStep === 0;
    const isLastStep = selectedStep === steps.length - 1;
    if ("targetElement" in step) {
      const res = renderTooltipElement({
        step,
        isFirstStep,
        isLastStep,
        target,
      });
      target.style.display = "block";
      void updateTooltip({
        options: { flip: false, shift: false },
        target,
        tooltip: res.tooltip,
        arrowEls: res.arrows,
        boundary: root,
        overlay: res.overlay,
        placement: step.placement,
      });
      renderEl = res.root;
    } else {
      const res = renderModalElement({ step, isFirstStep, isLastStep });
      renderEl = res.root;
    }

    const el = renderEl as HTMLElement | undefined;
    if (el) root.appendChild(el);
    return () => {
      if (el) el.remove();
    };
  });

  if (selectedStep === undefined) return null;

  return (
    <Box>
      <Box
        height="350px"
        p="space16"
        ref={rootRef}
        overflow="hidden"
        transform="translate3d(0,0,0)"
        {...{
          "& .flows-root": { pointerEvents: "none!" },
        }}
      >
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
          ref={targetRef}
        />
      </Box>
      <style>{cssStyle}</style>
    </Box>
  );
};

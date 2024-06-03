"use client";

import { renderModalElement, renderTooltipElement, updateTooltip } from "@flows/js/core";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { useFirstRender } from "hooks/use-first-render";
import type { FC } from "react";
import { useEffect, useMemo, useRef } from "react";
import { Text } from "ui";

import { useTemplate } from "./template-context";

export const TemplatePreview: FC = () => {
  const firstRender = useFirstRender();
  const { cssTemplate, cssVars } = useTemplate();
  const cssStyle = useMemo(() => [cssVars, cssTemplate].join(""), [cssTemplate, cssVars]);

  const tooltipRootRef = useRef<HTMLDivElement>(null);
  const tooltipTargetRef = useRef<HTMLDivElement>(null);
  const modalRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstRender) return;
    if (!tooltipRootRef.current || !tooltipTargetRef.current || !modalRootRef.current) return;

    const tooltip = renderTooltipElement({
      root: tooltipRootRef.current,
      target: tooltipTargetRef.current,
      step: {
        title: "Tooltip preview",
        // cspell:disable-next-line
        body: "This is just a preview of the tooltip. Try changing the styles in the sections above.",
        targetElement: ".tooltip-target",
      },
      isFirstStep: false,
      isLastStep: false,
    });
    void updateTooltip({
      target: tooltipTargetRef.current,
      tooltip: tooltip.tooltip,
      arrowEls: tooltip.arrows,
      boundary: tooltip.root,
    });

    const modal = renderModalElement({
      root: modalRootRef.current,
      isFirstStep: false,
      isLastStep: false,
      step: {
        title: "Modal preview",
        // cspell:disable-next-line
        body: "This is just a preview of the modal. Try changing the styles in the sections above.",
      },
    });

    return () => {
      tooltip.tooltip.remove();
      modal.root.querySelector("flows-modal")?.remove();
    };
  }, [firstRender]);

  if (firstRender) return null;

  return (
    <Box>
      <Text variant="titleL" mb="space8">
        Template preview
      </Text>
      <Grid gridTemplateColumns="1fr 1fr" gap="space16" h="260px">
        <Flex
          ref={tooltipRootRef}
          alignItems="center"
          cardWrap="-"
          overflow="hidden"
          p="space40"
          transform="translate3d(0,0,0)"
        >
          <Box
            bg="bg.primary"
            ref={tooltipTargetRef}
            className="tooltip-target"
            h="16px"
            rounded="radius100"
            w="16px"
          />
        </Flex>
        <Box ref={modalRootRef} cardWrap="-" transform="translate3d(0,0,0)" overflow="hidden" />
      </Grid>
      <style>{cssStyle}</style>
    </Box>
  );
};

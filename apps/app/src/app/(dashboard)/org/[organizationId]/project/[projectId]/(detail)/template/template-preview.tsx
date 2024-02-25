"use client";

import { endFlow, startFlow } from "@flows/js";
import { init } from "@flows/js/core";
import { Box, Flex } from "@flows/styled-system/jsx";
import { useFirstRender } from "hooks/use-first-render";
import type { FC } from "react";
import { useEffect, useMemo } from "react";

import { useTemplate } from "./template-context";

export const TemplatePreview: FC = () => {
  const firstRender = useFirstRender();
  const { cssTemplate, cssVars } = useTemplate();
  const cssStyle = useMemo(() => [cssVars, cssTemplate].join(""), [cssTemplate, cssVars]);

  useEffect(() => {
    if (firstRender) return;
    void init({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- internal option
      // @ts-expect-error
      validate: false,
      rootElement: "#template-preview-root",
      flows: [
        {
          id: "flow",
          steps: [
            {
              title: "Tooltip",
              body: "Hello world!",
              targetElement: ".tooltip-target",
              nextLabel: "Show modal",
            },
            {
              title: "Modal",
              body: "This is a modal!",
            },
          ],
        },
      ],
    });
    startFlow("flow");

    return () => endFlow("flow");
  }, [firstRender]);

  if (firstRender) return null;

  return (
    <>
      <Flex
        alignItems="center"
        cardWrap="-"
        h="200px"
        id="template-preview-root"
        overflow="hidden"
        p="space40"
        transform="translate3d(0,0,0)"
      >
        <Box bg="bg.primary" className="tooltip-target" h="16px" rounded="radius100" w="16px" />
      </Flex>
      <style>{cssStyle}</style>
    </>
  );
};

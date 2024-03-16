"use client";

import { css, cx } from "@flows/styled-system/css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>): JSX.Element => (
  <TooltipPrimitive.Content
    className={cx(
      css({
        zIndex: "tooltip",
        overflow: "hidden",
        borderRadius: "radius8",
        py: "space8",
        px: "space12",
        border: "1px solid",
        textStyle: "bodyS",
        display: "flex",
        gap: "space8",
        backgroundColor: "bg",
        color: "text",
        borderColor: "border",
      }),
      className,
    )}
    sideOffset={sideOffset}
    {...props}
  />
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type TooltipProps = {
  trigger: React.ReactNode;
  text: string;
  sideOffset?: number;
  side?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"];
  align?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["align"];
  className?: string;
};

export const Tooltip = ({
  text,
  trigger,
  align,
  className,
  side,
  sideOffset,
}: TooltipProps): JSX.Element => {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent align={align} className={className} side={side} sideOffset={sideOffset}>
          {text}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export { TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger };

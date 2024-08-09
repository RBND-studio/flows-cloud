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
        py: "6px", // This is intentional
        px: "space8",
        textStyle: "bodyXs",
        display: "flex",
        gap: "space8",
        backgroundColor: "bg.black",
        color: "text.onBlack",
        borderColor: "border",
        maxWidth: "280px",
        boxShadow: "l2",
      }),
      className,
    )}
    collisionPadding={16}
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
  delayDuration?: number;
};

export const Tooltip = ({
  text,
  trigger,
  align,
  className,
  side,
  sideOffset,
  delayDuration = 320,
}: TooltipProps): JSX.Element => {
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={delayDuration}>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        {text === "" ? null : (
          <TooltipContent align={align} className={className} side={side} sideOffset={sideOffset}>
            {text}
          </TooltipContent>
        )}
      </TooltipRoot>
    </TooltipProvider>
  );
};

export { TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger };

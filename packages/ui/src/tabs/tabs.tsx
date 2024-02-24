"use client";

import { css, cx } from "@flows/styled-system/css";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";

export const Tabs = TabsPrimitive.Root;
export const TabsContent = TabsPrimitive.Content;

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      className={cx(
        css({
          display: "flex",
          height: "40px",
          boxShadow: `inset 0 -1px 0 0 token(colors.border)`,
          boxShadowColor: "border",
          gap: "space8",
          mb: "space24",
        }),
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger {...props} asChild ref={ref}>
      <span
        className={cx(
          css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            borderRadius: "radius4",
            textStyle: "bodyS",
            position: "relative",
            color: "text.muted",
            height: "100%",
            "&[data-state=active]": {
              color: "text",
              fontWeight: "600",
              _before: {
                content: "''",
                boxSizing: "border-box",
                height: "2px",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "border.primary",
              },
            },
            _hover: {
              "& span": {
                backgroundColor: "bg.hover",
              },
            },
            _disabled: {
              pointerEvents: "none",
              "& span": {
                pointerEvents: "none",
              },
            },
          }),
          className,
        )}
      >
        <span
          className={css({
            fastEaseInOut: "background-color",
            px: "space8",
            py: "space4",
            cursor: "pointer",
            borderRadius: "radius4",
            position: "absolute",
          })}
        >
          {props.children}
        </span>
        <span
          className={css({
            px: "space8",
            py: "space4",
            fontWeight: "600",
            visibility: "hidden",
          })}
        >
          {props.children}
        </span>
      </span>
    </TabsPrimitive.Trigger>
  );
});

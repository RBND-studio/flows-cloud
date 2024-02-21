import { css, cx } from "@flows/styled-system/css";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type { ComponentProps, ElementRef } from "react";
import React, { forwardRef } from "react";

type Props = {
  className?: string;
  orientation?: ComponentProps<typeof SeparatorPrimitive.Root>["orientation"];
  decorative?: ComponentProps<typeof SeparatorPrimitive.Root>["decorative"];
};

type Ref = ElementRef<typeof SeparatorPrimitive.Root>;

export const Separator = forwardRef<Ref, Props>(function Separator(props, ref) {
  return (
    <SeparatorPrimitive.Root
      {...props}
      className={cx(
        css({
          bg: "border",
          h: props.orientation === "vertical" ? "100%" : "1px",
          w: props.orientation === "vertical" ? "1px" : "100%",
        }),
        props.className,
      )}
      ref={ref}
    />
  );
});

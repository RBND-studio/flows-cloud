"use client";

import { cva, cx } from "@flows/styled-system/css";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ReactNode } from "react";
import { forwardRef } from "react";

export const PopoverClose = PopoverPrimitive.Close;

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

type Props = {
  children?: ReactNode;
  className?: string;
  align?: PopoverPrimitive.PopperContentProps["align"];
};

export const PopoverContent = forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, Props>(
  function PopoverContent({ ...props }, ref) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cx(content(), props.className)}
          ref={ref}
          {...props}
          collisionPadding={16}
          sideOffset={4}
        />
      </PopoverPrimitive.Portal>
    );
  },
);

const content = cva({
  base: {
    borderRadius: "radius12",
    backgroundColor: "bg.card",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "border",
    boxShadow: "l2",
    overflow: "hidden",
    "&[data-state=open]": {
      animationName: "enter",
      animationDuration: "120ms",
    },
    "&[data-state=closed]": {
      animationName: "exit",
      animationDuration: "120ms",
    },
  },
});

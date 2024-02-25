import { css, cx } from "@flows/styled-system/css";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
  as?: "button" | "div";
  disabled?: boolean;
  onClick?: () => void;
};

export const MenuItem = forwardRef<HTMLElement, Props>(function MenuItem(
  { children, asChild, as, disabled, ...props },
  ref,
) {
  const Component = asChild ? Slot : as ?? "div";

  return (
    <Component
      {...props}
      className={cx(
        css({
          display: "flex",
          alignItems: "center",
          gap: "space8",
          py: "space8",
          px: "space8",
          borderRadius: "radius8",
          cursor: disabled ? "default" : "pointer",
          width: "100%",
          fastEaseInOut: "all",

          "&:hover": {
            bg: disabled ? "transparent" : "bg.hover",
          },
        }),
        props.className,
      )}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
      ref={ref as any}
    >
      {children}
    </Component>
  );
});

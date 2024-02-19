import { css, cx } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, FC, ReactNode } from "react";
import { forwardRef } from "react";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../popover";

type Props = {
  trigger: ReactNode;
  children?: ReactNode;
  align?: ComponentProps<typeof PopoverContent>["align"];
};

export const Menu: FC<Props> = ({ trigger, children, align }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align={align ?? "start"}>
        <Flex flexDir="column" justifyContent="center" minW="200px" p="space8">
          {children}
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

type MenuItemProps = {
  children?: ReactNode;
  asChild?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};
export const MenuItem: FC<MenuItemProps> = forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem({ children, asChild, disabled, className, ...props }, ref) {
    const Component = asChild ? Slot : "button";

    return (
      <PopoverClose asChild>
        <Component
          ref={ref}
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
              textStyle: "bodyS",

              _hover: {
                bg: disabled ? "transparent" : "bg.hover",
              },
            }),

            className,
          )}
        >
          {children}
        </Component>
      </PopoverClose>
    );
  },
);

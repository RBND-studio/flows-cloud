import { css, cva, cx } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check16 } from "icons";
import { forwardRef, type ReactNode, useId } from "react";

import { Icon } from "../icon";
import { Label } from "../label";

type Props = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
  defaultChecked?: boolean;
  label?: ReactNode;
  labelClassName?: string;
  inputClassName?: string;
  id?: string;
};

export const Checkbox = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, Props>(
  function Checkbox({ className, label, labelClassName, inputClassName, ...props }, ref) {
    const id = useId();

    const check = (
      <CheckboxPrimitive.Root
        className={cx(checkbox({}), inputClassName)}
        ref={ref}
        {...props}
        id={props.id ?? id}
      >
        <CheckboxPrimitive.Indicator
          className={css({
            display: "grid",
            color: "text.onPrimary",
            height: "100%",
            position: "relative",
          })}
        >
          <Icon
            className={css({
              height: "16px",
              width: "16px",
              position: "absolute",
              top: -1,
              left: -1,
            })}
            color="inherit"
            icon={Check16}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    return (
      <Flex alignItems="center" className={className} gap="space4">
        {check}
        {label !== undefined ? (
          <Label className={labelClassName} htmlFor={props.id ?? id}>
            {label}
          </Label>
        ) : null}
      </Flex>
    );
  },
);

const checkbox = cva({
  base: {
    width: "16px",
    height: "16px",
    borderRadius: "radius4",
    backgroundColor: "bg",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "border.strong",
    cursor: "pointer",
    fastEaseInOut: "all",

    _hover: {
      backgroundColor: "bg.hover",
    },
    "&[data-state=checked]": {
      borderColor: "bg.primary",
      backgroundColor: "bg.primary",
      _hover: {
        backgroundColor: "bg.primaryHover",
        borderColor: "bg.primaryHover",
      },
    },
    _disabled: {
      backgroundColor: "bg.subtle",
      borderColor: "bg.subtle",
      cursor: "default",
      "&>span": {
        backgroundColor: "bg.subtle",
        color: "text.disabled",
      },
    },
  },
});

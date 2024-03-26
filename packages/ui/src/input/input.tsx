import { css, cva, cx } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Slot } from "@radix-ui/react-slot";
import { type FocusEvent, forwardRef, type ReactNode, useId } from "react";

import { Description } from "../description";
import { Label } from "../label";

type Props = {
  /**
   * @defaultValue "medium"
   */
  size?: (typeof input.variantMap.size)[number];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  inputClassName?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  name?: string;
  minLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  asChild?: boolean;
  children?: ReactNode;
  optional?: boolean;
  label?: ReactNode;
  labelClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  readOnly?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    label,
    size = "default",
    className,
    labelClassName,
    inputClassName,
    descriptionClassName,
    optional,
    asChild,
    description,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : "input";
  const id = useId();

  return (
    <Flex className={className} flexDir="column">
      {label !== undefined ? (
        <Label
          className={cx(css({ mb: "space4" }), labelClassName)}
          htmlFor={props.id ?? id}
          optional={optional}
        >
          {label}
        </Label>
      ) : null}
      <Comp
        className={cx(input({ size }), inputClassName)}
        ref={ref}
        {...props}
        id={props.id ?? id}
      />
      {description !== undefined && (
        <Description className={cx(css({ mt: "space4" }), descriptionClassName)}>
          {description}
        </Description>
      )}
    </Flex>
  );
});

const input = cva({
  base: {
    borderRadius: "radius8",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "border.strong",
    backgroundColor: "bg.muted",
    outline: "none",
    transitionProperty: "border-color, background-color, box-shadow",
    fastEaseInOut: "border-color, background-color, box-shadow",
    color: "text",
    width: "100%",
    _hover: {
      borderColor: "border.primary",
      backgroundColor: "bg",
    },
    _focus: {
      borderColor: "border.primary",
      backgroundColor: "bg",
      boxShadow: "focus",
    },
    _disabled: {
      "&&": {
        backgroundColor: "bg.strong",
        borderColor: "border.strong",
        color: "text.muted",
      },
    },
  },
  variants: {
    size: {
      large: {
        px: "space16",
        py: "space12",
        textStyle: "bodyL",
      },
      medium: {
        px: "space12",
        py: "space8",
        textStyle: "bodyM",
      },
      default: {
        px: "space8",
        py: "5px",
        textStyle: "bodyS",
        height: "32px",
      },
    },
  },
});

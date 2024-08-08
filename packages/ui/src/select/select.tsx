"use client";

import { css, cx } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import * as RadixSelect from "@radix-ui/react-select";
import { CaretDown16, Check16 } from "icons";
import { type ComponentProps, useId } from "react";

import { Button } from "../button";
import { Description } from "../description";
import { Icon } from "../icon";
import { Label } from "../label";
import { Text } from "../text";

type Props<T extends string> = {
  value?: T;
  defaultValue?: T;
  options: readonly { value: T; label?: string }[];
  onChange?: (value: T) => void;
  className?: string;
  buttonClassName?: string;
  placeholder?: string;
  buttonSize?: ComponentProps<typeof Button>["size"];
  optional?: boolean;
  label?: string;
  labelClassName?: string;
  description?: string;
  descriptionClassName?: string;
  id?: string;
  ["aria-label"]?: string;
};

export function Select<T extends string>({
  options,
  className,
  buttonClassName,
  description,
  descriptionClassName,
  placeholder,
  label,
  labelClassName,
  buttonSize = "small",
  onChange,
  optional,
  "aria-label": ariaLabel,
  ...props
}: Props<T>): JSX.Element {
  const id = useId();
  const currentOption = options.find((opt) => opt.value === (props.value ?? props.defaultValue));

  const selectRender = (
    <RadixSelect.Root {...props} onValueChange={onChange}>
      <RadixSelect.Trigger asChild id={props.id ?? id}>
        <Button
          aria-label={ariaLabel}
          className={cx(
            css({
              textStyle: "bodyS",
              position: "relative",
              outline: "none",
              shadow: "none",
              "&>:last-child": {
                flex: 1,
                justifyContent: "flex-end",
              },
              _focus: {
                borderColor: "border.primary",
                backgroundColor: "bg",
                boxShadow: "focus",
              },
            }),
            buttonClassName,
          )}
          endIcon={
            <RadixSelect.Icon asChild>
              <Icon icon={CaretDown16} />
            </RadixSelect.Icon>
          }
          size={buttonSize}
          variant="field"
        >
          <RadixSelect.Value placeholder={placeholder}>
            {currentOption?.label ?? currentOption?.value}
          </RadixSelect.Value>
        </Button>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={css({
            backgroundColor: "bg",
            borderRadius: "radius8",
            boxShadow: "l2",
            p: "space4",
            position: "relative",
            zIndex: 50,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "border.strong",
            "&[data-state=open]": {
              animationName: "enter",
              animationDuration: "120ms",
            },
            "&[data-state=closed]": {
              animationName: "exit",
              animationDuration: "120ms",
            },
            minW: "var(--radix-select-trigger-width)",
          })}
          position="popper"
          sideOffset={4}
        >
          <RadixSelect.Viewport>
            {options.map((option) => (
              <RadixSelect.Item
                className={css({
                  display: "flex",
                  alignItems: "center",
                  gap: "space8",
                  px: "space8",
                  py: "space4",
                  borderRadius: "radius4",
                  cursor: "default",
                  _hover: { backgroundColor: "bg.hover" },
                  "&[data-highlighted]": { backgroundColor: "bg.hover" },
                  outline: "none",
                })}
                key={option.value}
                value={option.value}
              >
                <span className={css({ width: 16 })}>
                  <RadixSelect.ItemIndicator>
                    <Icon icon={Check16} />
                  </RadixSelect.ItemIndicator>
                </span>

                <RadixSelect.ItemText asChild>
                  <Text>{option.label ?? option.value}</Text>
                </RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );

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
      {selectRender}
      {description !== undefined && (
        <Description className={cx(css({ mt: "space4" }), descriptionClassName)}>
          {description}
        </Description>
      )}
    </Flex>
  );
}

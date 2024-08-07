import { cva, cx } from "@flows/styled-system/css";
import { type HTMLStyledProps, styled } from "@flows/styled-system/jsx";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { Spinner } from "../spinner";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  HTMLStyledProps<"button"> & {
    /**
     * @defaultValue "medium"
     */
    size?: (typeof button.variantMap.size)[number];
    /**
     * @defaultValue "primary"
     */
    variant?: (typeof button.variantMap.variant)[number];
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    asChild?: boolean;
    loading?: boolean;
    /**
     * @defaultValue "default"
     */
    shadow?: (typeof button.variantMap.shadow)[number];
  };

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    size = "default",
    variant = "black",
    shadow = "default",
    children,
    startIcon,
    endIcon,
    asChild,
    disabled,
    loading,
    ...props
  },
  ref,
): JSX.Element {
  const Component = asChild ? Slot : styled.button;
  return (
    <Component
      type={!asChild ? "button" : undefined}
      {...props}
      className={cx(button({ size, variant, shadow }), props.className)}
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing cannot be used here
      disabled={disabled || loading}
      ref={ref}
    >
      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing cannot be used here */}
      {startIcon || loading ? (
        <Icon position="start">{loading ? <Spinner color="inherit" size={16} /> : startIcon}</Icon>
      ) : null}
      <Slottable>{children}</Slottable>
      {endIcon ? <Icon position="end">{endIcon}</Icon> : null}
    </Component>
  );
});

const Icon = styled("span", {
  base: {
    display: "inline-flex",
  },
  variants: {
    position: {
      start: {
        marginRight: 8,
      },
      end: {
        marginLeft: 8,
      },
    },
  },
});

const button = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: 8,
    superFastEaseInOut: "all",
    shadow: "l1",
    textWrap: "nowrap",
    border: "1px solid transparent",
    _disabled: {
      pointerEvents: "none",
      cursor: "default",
      _hover: {
        backgroundColor: "bg.subtle",
        borderColor: "bg.subtle",
        color: "text.subtle",
      },
    },
  },
  variants: {
    size: {
      small: {
        textStyle: "titleS",
        padding: "3px 7px",
        height: 28,
      },
      default: {
        textStyle: "titleS",
        padding: "5px 11px",
        height: 32,
      },
      medium: {
        textStyle: "titleS",
        padding: "7px 15px",
        height: 36,
      },
      large: {
        textStyle: "titleL",
        padding: "9px 19px",
        height: 48,
      },
    },
    variant: {
      primary: {
        backgroundColor: "bg.primary",
        color: "text.onPrimary",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "bg.primary",
        _hover: {
          borderColor: "bg.primaryHover",
          backgroundColor: "bg.primaryHover",
        },
        _disabled: {
          backgroundColor: "bg.subtle",
          borderColor: "bg.subtle",
          color: "text.subtle",
          pointerEvents: "none",
          boxShadow: "none",
        },
        _active: {
          backgroundColor: "bg.primaryActive",
          borderColor: "bg.primaryActive",
        },
      },
      secondary: {
        color: "text",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "border.strong",
        backgroundColor: "bg.muted",
        _hover: {
          backgroundColor: "bg.hover",
        },
        _disabled: {
          backgroundColor: "bg.subtle",
          borderColor: "bg.subtle",
          color: "text.subtle",
          pointerEvents: "none",
          boxShadow: "none",
        },
        _active: {
          backgroundColor: "bg.active",
        },
      },
      black: {
        backgroundColor: "bg.black",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "bg.black",
        color: "text.onBlack",
        _hover: {
          borderColor: "bg.blackHover",
          backgroundColor: "bg.blackHover",
        },
        _disabled: {
          backgroundColor: "bg.subtle",
          borderColor: "bg.subtle",
          color: "text.subtle",
          pointerEvents: "none",
          boxShadow: "none",
        },
        _active: {
          backgroundColor: "bg.blackActive",
          borderColor: "bg.blackActive",
        },
      },
      // Used in select
      field: {
        color: "text",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "border.strong",
        backgroundColor: "bg.muted",
        _hover: {
          borderColor: "border.primary",
          backgroundColor: "bg",
        },
        _disabled: {
          backgroundColor: "bg.subtle",
          borderColor: "bg.subtle",
          color: "text.subtle",
          pointerEvents: "none",
          boxShadow: "none",
        },
      },
      ghost: {
        color: "text",
        backgroundColor: "transparent",
        shadow: "none",
        _hover: {
          backgroundColor: "bg.hover",
          shadow: "none",
        },
        _disabled: {
          color: "text.subtle",
          pointerEvents: "none",
          boxShadow: "none",
        },
        _active: {
          backgroundColor: "bg.active",
        },
      },
      danger: {
        color: "text.danger",
        backgroundColor: "bg.muted",
        borderColor: "border.strong",
        _hover: {
          backgroundColor: "bg.dangerHover",
          color: "text.onPrimary",
          borderColor: "bg.dangerHover",
        },
        _disabled: {
          backgroundColor: "bg.subtle",
          borderColor: "bg.subtle",
          color: "text.subtle",
          pointerEvents: "none",
          boxShadow: "none",
        },
        _active: {
          backgroundColor: "bg.dangerActive",
          borderColor: "bg.dangerActive",
        },
      },
    },
    shadow: {
      highlight: {
        boxShadow: "l3",
      },
      default: {},
    },
  },
});

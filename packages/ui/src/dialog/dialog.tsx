"use client";

import { css, cx } from "@flows/styled-system/css";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Close16 } from "icons";
import type { FC, ReactNode } from "react";

import { Icon } from "../icon";
import { Text } from "../text";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  children?: ReactNode;
  /**
   * @defaultValue 400
   */
  maxWidth?: 400 | 600;
};

export const Dialog: FC<Props> = ({ open, onOpenChange, trigger, children, maxWidth = 400 }) => {
  return (
    <RadixDialog.Root onOpenChange={onOpenChange} open={open}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={css({
            backgroundColor: "bg.overlay",
            position: "fixed",
            zIndex: 10,
            backdropFilter: "blur(4px)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            "&[data-state=open]": {
              animationName: "fadein",
              animationDuration: "120ms",
            },
            "&[data-state=closed]": {
              animationName: "fadeout",
              animationDuration: "120ms",
            },
          })}
        />
        <RadixDialog.Content
          onSubmit={(e) => e.stopPropagation()}
          className={css({
            backgroundColor: "bg",
            // TODO: come up with a systematic way for dialog widths
            maxWidth: maxWidth === 400 ? "400px" : "600px",
            width: "100%",
            borderRadius: "radius12",
            position: "fixed",
            zIndex: 10,
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            boxShadow: "l4",
            "&[data-state=open]": {
              animationName: "enter",
              animationDuration: "120ms",
            },
            "&[data-state=closed]": {
              animationName: "exit",
              animationDuration: "120ms",
            },
          })}
        >
          {children}
          <RadixDialog.Close
            aria-label="Close"
            className={css({
              position: "absolute",
              top: "space16",
              right: "space16",
              cursor: "pointer",
            })}
          >
            {/* TODO: use icon button when it's ready */}
            <Icon icon={Close16} />
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export const DialogClose = RadixDialog.Close;

export const DialogTitle: FC<{ children?: ReactNode; className?: string }> = ({
  className,
  children,
  ...props
}) => {
  return (
    <RadixDialog.Title className={cx(css({ px: "space16", py: "space16" }), className)} {...props}>
      <Text variant="titleL">{children}</Text>
    </RadixDialog.Title>
  );
};

export const DialogContent: FC<{ children?: ReactNode; className?: string }> = ({
  className,
  ...props
}) => {
  return <div className={cx(css({ px: "space16" }), className)} {...props} />;
};

export const DialogActions: FC<{ children?: ReactNode; className?: string }> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "space8",
          px: "space16",
          py: "space16",
        }),
        className,
      )}
      {...props}
    />
  );
};

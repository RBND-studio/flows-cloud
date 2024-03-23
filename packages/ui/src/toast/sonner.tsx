"use client";

import { css } from "@flows/styled-system/css";
import type { FC } from "react";
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";

export const Toaster: FC = () => {
  return (
    <SonnerToaster
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: css({
            width: "100%",
            borderRadius: "radius8",
            py: "space12",
            px: "space16",
            border: "1px solid",
            textStyle: "bodyS",
            display: "flex",
            gap: "space8",
            "& div svg": {
              mt: "space4",
            },
            backgroundColor: "bg",
            color: "text",
            borderColor: "border",
          }),
          title: css({
            textStyle: "bodyS!",
            fontWeight: "600!",
          }),
          description: css({
            color: "text.muted!",
          }),
          success: css({
            backgroundColor: "bg.successSubtle",
            borderColor: "border.successSubtle",

            "& div svg": {
              color: "icon.success",
            },
          }),
          warning: css({
            backgroundColor: "bg.warningSubtle",
            borderColor: "border.warningSubtle",
            "& div svg": {
              color: "icon.warning",
            },
          }),
          error: css({
            backgroundColor: "bg.dangerSubtle",
            borderColor: "border.dangerSubtle",
            "& div svg": {
              color: "icon.danger",
            },
          }),
          info: css({
            backgroundColor: "bg.infoSubtle",
            borderColor: "border.infoSubtle",
            "& div svg": {
              color: "icon.info",
            },
          }),
        },
      }}
    />
  );
};

export const toast = sonnerToast;

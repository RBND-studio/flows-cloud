"use client";
import { DarkModeProvider } from "@rbnd/react-dark-mode";
import { type FC, type ReactNode } from "react";
import { Toaster } from "ui";

import { PosthogProvider } from "./posthog-provider";

type Props = {
  children?: ReactNode;
};
export const Providers: FC<Props> = ({ children }) => {
  return (
    <DarkModeProvider>
      <PosthogProvider>
        <Toaster />
        {children}
      </PosthogProvider>
    </DarkModeProvider>
  );
};

"use client";

import { AuthProvider } from "auth/client";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const WelcomeProviders: FC<Props> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

"use client";
import { Slot } from "@radix-ui/react-slot";
import type { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const SignupClick: FC<Props> = ({ ...props }) => {
  const Component = Slot;

  return <Component {...props} onClick={() => window.plausible("Sign up")} />;
};

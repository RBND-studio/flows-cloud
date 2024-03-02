import { ResetPasswordNewForm } from "app/(auth)/reset-password/new/reset-password-new-form";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "New Password | Flows",
};

export default function ResetPasswordNew(): JSX.Element {
  return <ResetPasswordNewForm />;
}

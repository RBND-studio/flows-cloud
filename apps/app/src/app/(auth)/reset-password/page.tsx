import { ResetPasswordForm } from "app/(auth)/reset-password/reset-password-form";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Reset Password | Flows",
};

export default function ResetPasword(): JSX.Element {
  return <ResetPasswordForm />;
}

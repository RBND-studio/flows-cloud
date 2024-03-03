import type { Metadata } from "next";
import React from "react";

import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | Flows",
};

export default function ResetPasword(): JSX.Element {
  return <ResetPasswordForm />;
}

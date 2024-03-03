import type { Metadata } from "next";
import React from "react";

import { ResetPasswordNewForm } from "./reset-password-new-form";

export const metadata: Metadata = {
  title: "New Password | Flows",
};

export default function ResetPasswordNew(): JSX.Element {
  return <ResetPasswordNewForm />;
}

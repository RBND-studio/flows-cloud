import { getAuth } from "auth/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { routes } from "routes";

import { ResetPasswordNewForm } from "./reset-password-new-form";

export const metadata: Metadata = {
  title: "New Password | Flows",
};

export default async function ResetPasswordNew(): Promise<JSX.Element> {
  const auth = await getAuth();
  if (!auth) redirect(routes.login());

  return <ResetPasswordNewForm />;
}

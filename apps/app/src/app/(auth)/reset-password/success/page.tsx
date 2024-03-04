import type { Metadata } from "next";

import { ResetPasswordSuccess } from "./reset-password-success";

export const metadata: Metadata = {
  title: "Reset Password Success | Flows",
};

// Try it out by visiting http://localhost:6001/reset-password/success?email=example%40example.com
export default function SignUpSuccessPage(): JSX.Element {
  return <ResetPasswordSuccess />;
}

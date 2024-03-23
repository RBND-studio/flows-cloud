import type { Metadata } from "next";

import { SignUpSuccess } from "./sign-up-success";

export const metadata: Metadata = {
  title: "Sign Up Success | Flows",
};

// Try it out by visiting http://localhost:6001/signup/success?email=example%40example.com
export default function SignUpSuccessPage(): JSX.Element {
  return <SignUpSuccess />;
}

import { AuthWrapper } from "app/(auth)/auth-wrapper";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function AuthLayout({ children }: Props): JSX.Element {
  return <AuthWrapper>{children}</AuthWrapper>;
}

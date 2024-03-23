import { AuthLayoutWrapper } from "components/ui/auth-layout-wrapper";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function NewPasswordLayout({ children }: Props): JSX.Element {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}

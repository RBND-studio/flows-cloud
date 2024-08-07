import { WelcomeRedirect } from "app/(dashboard)/welcome-redirect";
import { type ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function OrgLayout({ children }: Props): JSX.Element {
  return (
    <>
      {children}
      <WelcomeRedirect />
    </>
  );
}

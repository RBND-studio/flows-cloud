import { getAuth } from "auth/server";
import { AuthLayoutWrapper } from "components/ui/auth-layout-wrapper";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { routes } from "routes";

type Props = {
  children?: ReactNode;
};

export default async function AuthLayout({ children }: Props): Promise<JSX.Element> {
  const auth = await getAuth();
  if (auth) redirect(routes.home);

  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}

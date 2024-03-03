import { getAuth } from "auth/server";
import type { ReactNode } from "react";
import { Text } from "ui";

type Props = {
  children?: ReactNode;
};

export default async function AuthLayout({ children }: Props): Promise<JSX.Element> {
  const auth = await getAuth();
  if (!auth) return <Text>Loading...</Text>;

  return <>{children}</>;
}

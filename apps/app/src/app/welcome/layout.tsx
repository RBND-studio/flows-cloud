import { Flex, Grid } from "@flows/styled-system/jsx";
import { getAuth } from "auth/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { routes } from "routes";
import { Logo } from "ui";

import { TopRightButtons } from "./top-right-buttons";
import { WelcomeProviders } from "./welcome-providers";

type Props = {
  children: ReactNode;
};

export default async function WelcomeLayout({ children }: Props): Promise<JSX.Element> {
  const auth = await getAuth();
  if (!auth) return redirect(routes.login());

  return (
    <WelcomeProviders>
      <Grid height="100vh" placeItems="center" position="relative">
        <Flex alignItems="center" flexDirection="column" my="space40" px="space16" width="100%">
          {children}
        </Flex>
        <Flex alignItems="center" gap="space8" left="space24" position="absolute" top="space24">
          <Logo type="type" size={24} />
        </Flex>
        <TopRightButtons />
      </Grid>
    </WelcomeProviders>
  );
}

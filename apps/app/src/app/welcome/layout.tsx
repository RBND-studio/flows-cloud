import { Flex, Grid } from "@flows/styled-system/jsx";
import Image from "next/image";
import type { ReactNode } from "react";
import { Text } from "ui";

import { LogoutButton } from "./logout-button";
import { WelcomeProviders } from "./welcome-providers";

type Props = {
  children: ReactNode;
};

export default function WelcomeLayout({ children }: Props): JSX.Element {
  return (
    <WelcomeProviders>
      <Grid height="100vh" placeItems="center" position="relative">
        <Flex alignItems="center" flexDirection="column" my="space40" px="space16" width="100%">
          {children}
        </Flex>
        <Flex alignItems="center" gap="space8" left="space24" position="absolute" top="space24">
          <Image alt="Logo" height={28} priority src="/logo.svg" width={28} />
          <Text variant="bodyM" weight="700">
            Flows
          </Text>
        </Flex>
        <LogoutButton />
      </Grid>
    </WelcomeProviders>
  );
}

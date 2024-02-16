import { Grid } from "@flows/styled-system/jsx";
import type { ReactNode } from "react";

import { LogoutButton } from "./logout-button";
import { WelcomeProviders } from "./welcome-providers";

type Props = {
  children: ReactNode;
};

export default function WelcomeLayout({ children }: Props): JSX.Element {
  return (
    <WelcomeProviders>
      <Grid height="100vh" placeItems="center" position="relative">
        {children}
        <LogoutButton />
      </Grid>
    </WelcomeProviders>
  );
}

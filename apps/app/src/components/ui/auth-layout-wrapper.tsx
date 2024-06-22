import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { Logo } from "ui";

type Props = {
  children: React.ReactNode;
};

export const AuthLayoutWrapper: FC<Props> = ({ children }) => {
  return (
    <Grid height="100vh" placeItems="center" position="relative">
      <Box maxW="400px" my="space40" px="space16" width="100%">
        <Flex alignItems="center" gap="space8" justifyContent="center" mb="space32">
          <Logo type="type" size={28} />
        </Flex>
        {children}
      </Box>
    </Grid>
  );
};

import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import Image from "next/image";
import type { FC } from "react";
import { Text } from "ui";

type Props = {
  children: React.ReactNode;
};

export const AuthWrapper: FC<Props> = ({ children }) => {
  return (
    <Grid height="100vh" placeItems="center" position="relative">
      <Box maxW="400px" my="space40" px="space16" width="100%">
        <Flex alignItems="center" gap="space8" justifyContent="center" mb="space32">
          <Image alt="Logo" height={28} priority src="/logo.svg" width={28} />
          <Text variant="titleL">Flows Cloud</Text>
        </Flex>
        {children}
      </Box>
    </Grid>
  );
};

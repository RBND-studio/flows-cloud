import { Box, Flex } from "@flows/styled-system/jsx";
import { Text } from "ui";

import { SubscribeForm } from "./subscribe-form";

export default function WelcomeSubscribePage(): JSX.Element {
  return (
    <Flex flexDirection="column" gap="space24" maxW="400px" width="100%">
      <Flex alignItems="center" flexDirection="column" gap="space4">
        <Text variant="titleL">Welcome to Flows</Text>
        <Text color="muted">Start by creating an organization for your projects.</Text>
      </Flex>
      <Box borderRadius="radius12" cardWrap="-" padding="space24">
        <SubscribeForm />
      </Box>
    </Flex>
  );
}

import { Flex } from "@flows/styled-system/jsx";
import { Text } from "ui";

import { NewsletterForm } from "./newsletter-form";

export default function WelcomeSubscribePage(): JSX.Element {
  return (
    <Flex flexDirection="column" gap="space24" maxW="400px" width="100%">
      <Flex alignItems="center" flexDirection="column" gap="space4">
        <Text variant="titleL">Subscribe to updates</Text>
        <Text color="muted" align="center">
          Flows are improving every month. These are the best ways to stay in the loop.
        </Text>
      </Flex>

      <NewsletterForm />
    </Flex>
  );
}

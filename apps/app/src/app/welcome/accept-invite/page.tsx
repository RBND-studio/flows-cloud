import { Box, Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { redirect } from "next/navigation";
import { routes } from "routes";
import { Text } from "ui";

import { Invites } from "./invites";

// Preview by visiting http://localhost:6001/welcome/accept-invite
export default async function WelcomeAcceptInvitePage(): Promise<JSX.Element> {
  const me = await load(api["/me"]());

  if (!me.pendingInvites.length) redirect(routes.welcome);

  return (
    <Flex flexDirection="column" gap="space24" maxW="400px" width="100%">
      <Flex alignItems="center" flexDirection="column" gap="space4">
        <Text variant="titleL">Welcome to Flows</Text>
        <Text align="center" color="muted">
          You have pending invites to join organizations.
        </Text>
      </Flex>
      <Box borderRadius="radius12" cardWrap="-" padding="space24">
        <Invites invites={me.pendingInvites} />
      </Box>
    </Flex>
  );
}

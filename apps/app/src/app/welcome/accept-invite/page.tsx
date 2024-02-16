import { Box } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { Text } from "ui";

import { Invites } from "./invites";

// TODO: @opesicka make this pretty
// Preview by visiting http://localhost:6001/welcome/accept-invite
export default async function WelcomeAcceptInvitePage(): Promise<JSX.Element> {
  const me = await load(api["/me"]());

  return (
    <Box cardWrap="-" padding="space16">
      <Text>Welcome accept invites</Text>
      <Invites invites={me.pendingInvites} />
    </Box>
  );
}

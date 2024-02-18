import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { Text } from "ui";

import { InviteForm } from "./invite-form";

type Props = {
  params: {
    organizationId: string;
    projectId: string;
  };
};

export default async function WelcomeOrganizationProjectPage({
  params,
}: Props): Promise<JSX.Element> {
  const org = await load(api["/organizations/:organizationId"](params.organizationId));

  return (
    <Flex flexDirection="column" gap="space24" maxW="400px" width="100%">
      <Flex alignItems="center" flexDirection="column" gap="space4">
        <Text variant="titleL">Invite colleagues to {org.name}</Text>
        <Text align="center" className={css({})} color="muted">
          Flows are better with friends. Invite your colleagues to test it out with.
        </Text>
      </Flex>
      <Box borderRadius="radius12" cardWrap="-" padding="space24">
        <InviteForm organizationId={params.organizationId} projectId={params.projectId} />
      </Box>
    </Flex>
  );
}

import { Box, Flex } from "@flows/styled-system/jsx";
import { OrganizationForm } from "app/welcome/[organizationId]/organization-form";
import { api } from "lib/api";
import { load } from "lib/load";
import { redirect } from "next/navigation";
import { routes } from "routes";
import { Text } from "ui";

// Preview by visiting http://localhost:6001/welcome
export default async function WelcomePage(): Promise<JSX.Element> {
  const me = await load(api["/me"]());

  if (me.pendingInvites.length) redirect(routes.welcomeAcceptInvite);

  return (
    <Flex flexDirection="column" gap="space24" maxW="400px" width="100%">
      <Flex alignItems="center" flexDirection="column" gap="space4">
        <Text variant="titleL">Welcome to Flows</Text>
        <Text color="muted">Start by creating an organization for your projects.</Text>
      </Flex>
      <Box borderRadius="radius12" cardWrap="-" padding="space24">
        <OrganizationForm />
      </Box>
    </Flex>
  );
}

import { Box, Flex } from "@flows/styled-system/jsx";
import { ProjectForm } from "app/welcome/[organizationId]/project-form";
import { api } from "lib/api";
import { load } from "lib/load";
import { Text } from "ui";

type Props = {
  params: {
    organizationId: string;
  };
};

export default async function WelcomeOrganizationPage({ params }: Props): Promise<JSX.Element> {
  const org = await load(api["/organizations/:organizationId"](params.organizationId));

  return (
    <Flex flexDirection="column" gap="space24" maxW="400px" width="100%">
      <Flex alignItems="center" flexDirection="column" gap="space4">
        <Text variant="titleL">Create a project in {org.name}</Text>
        <Text align="center" color="muted">
          Projects typically represent a single application or a set of related applications.
        </Text>
      </Flex>
      <Box borderRadius="radius12" cardWrap="-" padding="space24">
        <ProjectForm organizationId={params.organizationId} />
      </Box>
    </Flex>
  );
}

import { Flex } from "@flows/styled-system/jsx";
import { Text } from "ui";

import { CreateFlow } from "./create-flow";
import { Domains } from "./domains";
import { InfoSidebar } from "./info-sidebar";
import { InstallInstructions } from "./install-instructions";

type Props = {
  params: { projectId: string; organizationId: string };
};

//TODO: make this responsive
export default function ProjectSettingsPage({ params }: Props): JSX.Element {
  return (
    <Flex flexDirection="column" gap="space48" mt="space24">
      <Flex flexDirection="column" gap="space8">
        <Text variant="titleXl">Welcome to Flows 👋</Text>
        <Text color="muted">Here’s how to get up and running with Flows in three easy steps.</Text>
      </Flex>
      <Flex gap="space40" mb="space40">
        <Flex flexDirection="column" gap="space48">
          <InstallInstructions
            organizationId={params.organizationId}
            projectId={params.projectId}
          />
          <Domains organizationId={params.organizationId} projectId={params.projectId} />
          <CreateFlow organizationId={params.organizationId} projectId={params.projectId} />
        </Flex>
        <InfoSidebar />
      </Flex>
    </Flex>
  );
}

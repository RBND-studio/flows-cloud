import { Flex } from "@flows/styled-system/jsx";
import { Text } from "ui";

import { CreateFlow } from "./create-flow";
import { InstallInstructions } from "./install-instructions";
import { LearnMore } from "./learn-more";

type Props = {
  params: { projectId: string; organizationId: string };
};

export default function ProjectSettingsPage({ params }: Props): JSX.Element {
  return (
    <Flex flexDirection="column" gap="space40" mt="space24">
      <Flex flexDirection="column" gap="space8">
        <Text variant="titleXl">Welcome to Flows 👋</Text>
        <Text color="muted">
          Here&apos;s how to get up and running with Flows in two easy steps.
        </Text>
      </Flex>
      <InstallInstructions organizationId={params.organizationId} projectId={params.projectId} />
      <CreateFlow organizationId={params.organizationId} projectId={params.projectId} />
      <LearnMore />
    </Flex>
  );
}

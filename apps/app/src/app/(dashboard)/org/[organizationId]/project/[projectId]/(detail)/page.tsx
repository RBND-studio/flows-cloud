import { Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { Button, Text } from "ui";

import { CreateFlowDialog } from "./create-flow-dialog";
import { FlowsList } from "./flows-list";

type Props = {
  params: { projectId: string; organizationId: string };
};

export default async function ProjectDetailPage({
  params: { projectId, organizationId },
}: Props): Promise<JSX.Element> {
  const [project, flows] = await Promise.all([
    load(api["/projects/:projectId"](projectId)),
    load(api["/projects/:projectId/flows"](projectId)),
  ]);

  return (
    <>
      <Flex flexDirection="column" gap="space8" mb="space16">
        <Flex justifyContent="space-between">
          <Text variant="titleXl">{project.name}</Text>
          <CreateFlowDialog
            organizationId={project.organization_id}
            projectId={projectId}
            trigger={<Button variant="black">New flow</Button>}
          />
        </Flex>
        <Text color="muted">{project.description}</Text>
      </Flex>

      <FlowsList flows={flows} organizationId={organizationId} projectId={projectId} />
    </>
  );
}

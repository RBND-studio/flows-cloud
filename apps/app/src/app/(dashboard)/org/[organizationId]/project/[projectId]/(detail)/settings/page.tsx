import { Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { Text } from "ui";

import { ProjectDeleteDialog } from "./project-delete-dialog";
import { ProjectDomains } from "./project-domains";
import { ProjectEditForm } from "./project-edit-form";
import { ProjectUserProgressDelete } from "./project-user-progress-delete";

type Props = {
  params: { projectId: string };
};

export default async function ProjectSettingsPage({ params }: Props): Promise<JSX.Element> {
  const project = await load(api["/projects/:projectId"](params.projectId));

  return (
    <>
      <Flex flexDirection="column" gap="space8" mb="space16">
        <Flex justifyContent="space-between">
          <Text variant="titleXl">{project.name}</Text>

          <ProjectDeleteDialog project={project} />
        </Flex>
        <Text color="muted">{project.description}</Text>
      </Flex>

      <ProjectEditForm project={project} />
      <ProjectDomains project={project} />
      <ProjectUserProgressDelete project={project} />
    </>
  );
}

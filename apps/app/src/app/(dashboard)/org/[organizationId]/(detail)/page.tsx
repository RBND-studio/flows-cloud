import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { CreateProjectDialog } from "components/projects";
import { api } from "lib/api";
import { load } from "lib/load";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { routes } from "routes";
import { Button, Text } from "ui";

import { OrganizationDeleteDialog } from "../organization-delete-dialog";

type Props = {
  params: { organizationId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const org = await load(api["/organizations/:organizationId"](params.organizationId));

  return {
    title: `${org.name} | Flows`,
  };
}

export default async function ProjectsPage({ params }: Props): Promise<JSX.Element> {
  const projects = await load(
    api["/organizations/:organizationId/projects"](params.organizationId),
  );
  if (projects.length)
    return redirect(
      routes.project({ projectId: projects[0].id, organizationId: projects[0].organization_id }),
    );

  const org = await load(api["/organizations/:organizationId"](params.organizationId));

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mb="space16">
        <Text variant="titleXl">{org.name}</Text>
        <OrganizationDeleteDialog organization={org} />
      </Flex>

      <Flex
        alignItems="center"
        cardWrap="-"
        flexDirection="column"
        gap="space8"
        py="space32"
        width="100%"
      >
        <Text variant="titleM">This organization has no projects</Text>
        <Text
          className={css({
            mb: "space16",
          })}
          color="subtle"
          variant="bodyXs"
        >
          Projects typically represent a single application or a set of related applications. Each
          project has its own set of flows, analytics, and settings.
        </Text>
        <CreateProjectDialog
          organizationId={params.organizationId}
          trigger={<Button>New Project</Button>}
        />
      </Flex>
    </>
  );
}

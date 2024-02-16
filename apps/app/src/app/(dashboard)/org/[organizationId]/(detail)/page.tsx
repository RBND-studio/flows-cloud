import { css } from "@flows/styled-system/css";
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
      <div className={css({ display: "flex", alignItems: "center", gap: "space8" })}>
        <Text className={css({ mb: "space16", flex: 1 })} variant="title3xl">
          {org.name}
        </Text>

        <CreateProjectDialog
          organizationId={params.organizationId}
          trigger={<Button>New Project</Button>}
        />
        <OrganizationDeleteDialog organization={org} />
      </div>

      <Text>No projects found</Text>
    </>
  );
}

import { css } from "@flows/styled-system/css";
import { getAuth } from "auth/server";
import { CreateProjectDialog } from "components/projects";
import { api } from "lib/api";
import { redirect } from "next/navigation";
import { routes } from "routes";
import { Button, Text } from "ui";

import { OrganizationDeleteDialog } from "./organization-delete-dialog";

type Props = {
  params: { organizationId: string };
};

export default async function ProjectsPage({ params }: Props): Promise<JSX.Element> {
  const auth = await getAuth();
  if (!auth) return redirect(routes.login());
  const fetchCtx = { token: auth.access_token };
  const projects = await api["/organizations/:organizationId/projects"](params.organizationId)(
    fetchCtx,
  );
  if (projects.length)
    return redirect(
      routes.project({ projectId: projects[0].id, organizationId: projects[0].organization_id }),
    );

  const org = await api["/organizations/:organizationId"](params.organizationId)(fetchCtx);

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

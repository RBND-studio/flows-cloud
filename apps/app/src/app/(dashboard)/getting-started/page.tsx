import { api } from "lib/api";
import { load } from "lib/load";
import { redirect } from "next/navigation";
import { routes } from "routes";

export default async function GettingStartedPage(): Promise<JSX.Element> {
  const organizations = await load(api["/organizations"]());

  const org = organizations.at(0);
  if (!org) return redirect(routes.welcome);

  // TODO: refactor to single api call after https://github.com/RBND-studio/flows-cloud/pull/303 is merged
  const projects = await load(api["/organizations/:organizationId/projects"](org.id));
  const proj = projects.at(0);
  if (proj)
    return redirect(
      routes.projectGettingStarted({ organizationId: proj.organization_id, projectId: proj.id }),
    );

  return redirect(routes.welcomeOrganization({ organizationId: org.id }));
}

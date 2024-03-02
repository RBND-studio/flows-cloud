import { api } from "lib/api";
import { load } from "lib/load";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { routes } from "routes";

export const metadata: Metadata = {
  title: "Dashboard | Flows",
};

export default async function DashboardPage(): Promise<JSX.Element> {
  const organizations = await load(api["/organizations"]());

  if (!organizations.length) return redirect(routes.welcome);

  const org = organizations[0];
  const projects = await load(api["/organizations/:organizationId/projects"](org.id));
  if (projects.length)
    return redirect(
      routes.project({ projectId: projects[0].id, organizationId: projects[0].organization_id }),
    );

  return redirect(routes.organization({ organizationId: organizations[0].id }));
}

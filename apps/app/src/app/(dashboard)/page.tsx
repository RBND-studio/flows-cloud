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

  const org = organizations.at(0);
  if (!org) return redirect(routes.welcome);

  const proj = org.projects.at(0);
  if (proj) return redirect(routes.project({ projectId: proj.id, organizationId: org.id }));

  return redirect(routes.organization({ organizationId: organizations[0].id }));
}

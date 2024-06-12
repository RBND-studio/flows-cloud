import { api } from "lib/api";
import { load } from "lib/load";
import { redirect } from "next/navigation";
import { routes } from "routes";

type Props = {
  params: { projectId: string; flowId: string };
};

export default async function ProjectFlowPage({ params }: Props): Promise<JSX.Element> {
  const { projectId } = params;
  const [project, projectFlows] = await Promise.all([
    load(api["/projects/:projectId"](projectId)),
    load(api["/projects/:projectId/flows"](projectId)),
  ]);
  const flow = projectFlows.find((f) => f.human_id === params.flowId);

  if (!flow)
    return redirect(routes.project({ organizationId: project.organization_id, projectId }));

  redirect(
    routes.flowEdit({ flowId: flow.id, projectId, organizationId: project.organization_id }),
  );
}

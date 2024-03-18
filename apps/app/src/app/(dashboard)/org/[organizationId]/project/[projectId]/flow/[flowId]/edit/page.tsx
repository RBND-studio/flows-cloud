import { api } from "lib/api";
import { load } from "lib/load";

import { FlowEditForm } from "./flow-edit-form";

type Props = {
  params: { flowId: string; projectId: string; organizationId: string };
};

export default async function FlowEditPage({ params }: Props): Promise<JSX.Element> {
  const { flowId, organizationId } = params;
  const flow = await load(api["/flows/:flowId"](flowId));

  return <FlowEditForm flow={flow} organizationId={organizationId} />;
}

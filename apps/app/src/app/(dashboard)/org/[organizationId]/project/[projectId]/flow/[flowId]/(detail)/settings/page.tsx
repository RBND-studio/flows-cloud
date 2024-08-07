import { api } from "lib/api";
import { load } from "lib/load";

import { FlowGeneralForm } from "./flow-general-form";
import { FlowResetUserProgress } from "./flow-reset-user-progress";

type Props = {
  params: { flowId: string; organizationId: string };
};

export default async function FlowSettingsPage({ params }: Props): Promise<JSX.Element> {
  const flow = await load(api["/flows/:flowId"](params.flowId));

  return (
    <>
      <FlowGeneralForm flow={flow} />
      <FlowResetUserProgress flow={flow} />
    </>
  );
}

import { Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";

import { AnalyticsPreview } from "./analytics-preview";
import { SetupSection } from "./setup-section";

type Props = {
  params: { flowId: string; projectId: string; organizationId: string };
};

export default async function FlowDetailPage({ params }: Props): Promise<JSX.Element> {
  const flow = await load(api["/flows/:flowId"](params.flowId));

  return (
    <Flex direction="column" gap="space24" width="100%">
      <AnalyticsPreview flow={flow} />
      <SetupSection flow={flow} params={params} />
    </Flex>
  );
}

import type { FlowSteps } from "@flows/js";
import { Flex } from "@flows/styled-system/jsx";
import type { FlowDetail } from "lib/api";
import Link from "next/link";
import type { FC } from "react";
import { routes } from "routes";
import { Button, Text } from "ui";

import { StepsPreview } from "./steps/steps-preview";

type Props = {
  params: { flowId: string; projectId: string; organizationId: string };
  flow: FlowDetail;
};

export const StepsSection: FC<Props> = ({ params, flow }) => {
  const steps = flow.publishedVersion?.steps as FlowSteps | undefined;

  // TODO: maybe we should show something?
  if (flow.flow_type === "local") return null;

  return (
    <Flex cardWrap="-" direction="column" padding="space16" width="100%">
      <Flex alignItems="flex-start" justifyContent="space-between" width="100%">
        <Text variant="titleL">Published steps</Text>
        <Button asChild variant="secondary">
          <Link href={routes.flowSteps(params)}>Edit</Link>
        </Button>
      </Flex>
      {steps ? <StepsPreview steps={steps} /> : <Text color="muted">No steps</Text>}
    </Flex>
  );
};

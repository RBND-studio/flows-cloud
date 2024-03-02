import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FlowDetail } from "lib/api";
import Link from "next/link";
import type { FC } from "react";
import { routes } from "routes";
import { Button, Text } from "ui";

import { Frequency } from "./frequency";
import { Launch } from "./launch";
import { Targeting } from "./targeting";

type Props = {
  params: { flowId: string; projectId: string; organizationId: string };
  flow: FlowDetail;
};

export const SetupSection: FC<Props> = ({ params, flow }) => {
  const flowIsLocal = flow.flow_type === "local";

  return (
    <Flex
      className={css({
        cardWrap: "-",
      })}
      direction="column"
      gap="space12"
      padding="space16"
      width="100%"
    >
      <Flex alignItems="flex-start" justifyContent="space-between" width="100%">
        <Text variant="titleL">Published setup</Text>
        <Button asChild disabled={flowIsLocal} variant="secondary">
          <Link href={routes.flowSettings(params)}>Edit</Link>
        </Button>
      </Flex>
      <Flex direction="column" gap="space24">
        {flowIsLocal ? (
          <Text color="muted">Check your codebase to see setup of a local flow.</Text>
        ) : null}
        {!flowIsLocal && (
          <>
            <Frequency flow={flow} />
            <Targeting flow={flow} />
            <Launch flow={flow} />
          </>
        )}
      </Flex>
    </Flex>
  );
};

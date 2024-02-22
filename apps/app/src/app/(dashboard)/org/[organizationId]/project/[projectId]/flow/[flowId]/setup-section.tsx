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
        <Link href={routes.flowSettings(params)}>
          <Button variant="secondary">Edit</Button>
        </Link>
      </Flex>
      <Flex direction="column" gap="space24">
        <Frequency flow={flow} />
        <Targeting flow={flow} />
        <Launch flow={flow} />
      </Flex>
    </Flex>
  );
};

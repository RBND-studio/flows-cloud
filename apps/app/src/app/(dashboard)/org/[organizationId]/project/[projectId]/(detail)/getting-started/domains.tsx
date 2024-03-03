import { Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import type { FC } from "react";
import { routes } from "routes";
import { Button, Text } from "ui";

import { NumberCircle } from "./number-circle";

type Props = {
  projectId: string;
  organizationId: string;
};

export const Domains: FC<Props> = ({ projectId, organizationId }) => {
  return (
    <Flex gap="space12">
      <NumberCircle>2</NumberCircle>
      <Flex
        alignItems="center"
        flex="1"
        gap="space16"
        justifyContent="space-between"
        mdDown={{ flexDirection: "column", justifyContent: "unset", alignItems: "flex-start" }}
      >
        <Flex flexDirection="column" gap="space4">
          <Text variant="titleL">Setup your domains</Text>
          <Text color="muted">
            Add the domains you want to use for your flows. On localhost flows will always load and
            you won&apos;t be charged.
          </Text>
        </Flex>
        <Button asChild size="medium" variant="primary">
          <Link href={routes.projectSettings({ projectId, organizationId })}>Setup domains</Link>
        </Button>
      </Flex>
    </Flex>
  );
};

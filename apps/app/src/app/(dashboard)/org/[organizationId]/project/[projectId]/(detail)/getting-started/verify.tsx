import { Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import type { FC } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

import { NumberCircle } from "./number-circle";

export const Verify: FC = () => {
  return (
    <Flex gap="space12">
      <NumberCircle>3</NumberCircle>
      <Flex
        alignItems="center"
        flex="1"
        gap="space16"
        justifyContent="space-between"
        mdDown={{ flexDirection: "column", justifyContent: "unset", alignItems: "flex-start" }}
      >
        <Flex flexDirection="column" gap="space4">
          <Text variant="titleL">Verify the installation</Text>
          <Text color="muted">
            Verify that the Flows SDK is installed correctly on your website before you start
            creating flows.
          </Text>
        </Flex>
        <Button asChild size="medium" variant="primary">
          <Link target="_blank" href={links.docsVerifyInstallation}>
            Learn how
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
};

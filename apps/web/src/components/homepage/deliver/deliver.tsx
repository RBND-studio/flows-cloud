import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Section } from "components/ui/section";
import type { FC } from "react";
import { Text } from "ui";

import { Content } from "./content";

export const DeliverSection: FC = () => {
  return (
    <Section
      innerClassName={css({
        display: "flex",
        flexDirection: "column",
        gap: "space64",
      })}
      sectionPadding="small"
    >
      <Flex flexDir="column" gap="space12" maxW="480px">
        <Text as="h2" variant="title3xl">
          Reliable product tours with a robust platform
        </Text>
        <Text variant="bodyL" color="muted">
          Onboarding needs to be reliable. Flows is built to never let you down.
        </Text>
      </Flex>
      <Content />
    </Section>
  );
};

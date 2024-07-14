import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Section } from "components/ui/section";
import type { FC } from "react";
import { Text } from "ui";

import { Content } from "./content";

export const BuilderSection: FC = () => {
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
          Product onboarding created to be your own.
        </Text>
        <Text variant="bodyL" color="muted">
          Build anything and everything you need to drive product adoption and activation with
          Flows.
        </Text>
      </Flex>
      <Content />
    </Section>
  );
};

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Section } from "components/ui/section";
import type { FC } from "react";
import { Text } from "ui";

import { Content } from "./content";

export const AnalyzeSection: FC = () => {
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
          Analyze, optimize, fix
        </Text>
        <Text variant="bodyL" color="muted">
          Understand user behavior and iterate on your onboarding flows.
        </Text>
      </Flex>
      <Content />
    </Section>
  );
};

import { css } from "@flows/styled-system/css";
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
        gap: "space40",
        alignItems: "center",
      })}
      sectionPadding="small"
    >
      <Text align="center" as="h2" variant="title3xl">
        Onboarding flows reimagined
      </Text>
      <Content />
    </Section>
  );
};

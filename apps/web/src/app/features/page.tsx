import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { FeatureGrid } from "components/feature-grid";
import { Section } from "components/ui";
import type { ReactElement } from "react";
import { Logo, Text } from "ui";

import { featuresData } from "./content";

const Page = (): ReactElement => {
  return (
    <>
      <Section
        innerClassName={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "space24",
        })}
        outerClassName={css({
          backgroundImage: "radial-gradient(token(colors.special.dotBg) 1px, transparent 0)",
          backgroundSize: "16px 16px",
          borBottom: "1px",
        })}
      >
        <Logo type="pill" size={80} />
        <Flex flexDirection="column" gap="space12" maxW="800px">
          <Text align="center" as="h1" variant="title4xl">
            The new standard for building user onboarding
          </Text>
          <Text
            align="center"
            className={css({
              maxWidth: "600px",
              marginX: "auto",
            })}
            color="muted"
            variant="bodyL"
          >
            With its flexible approach, Flows unlocks the potential of your product by providing the
            tools to build seamless onboarding experiences for your users. It is the tool of choice
            for modern SaaS companies.
          </Text>
        </Flex>
      </Section>
      {featuresData.map((section) => (
        <FeatureGrid key={section.title} {...section} />
      ))}
    </>
  );
};

export default Page;

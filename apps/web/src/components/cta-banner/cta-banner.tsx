import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Section } from "components/ui/section";
import { SignupClick } from "components/utils/signup-click";
import type { ReactElement } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

//TODO: fix the layout for blog and feature pages
export const CtaBanner = (): ReactElement => {
  return (
    <Section
      innerClassName={css({
        display: "flex",
        gap: "space24",
        alignItems: "center",
        justifyContent: "space-between",
        mdDown: {
          flexDirection: "column",
          alignItems: "flex-start",
        },
      })}
      outerClassName={css({
        borTop: "1px",
      })}
    >
      <Text as="h2" variant="title2xl">
        Ready to start driving product <br /> activation and adoption?
      </Text>

      <Flex gap="space16">
        <SignupClick>
          <Button asChild shadow="highlight" size="betweenMediumAndLarge">
            <a href={links.signUp}>Sign up for free</a>
          </Button>
        </SignupClick>
        <Button variant="secondary" asChild size="betweenMediumAndLarge">
          <a href={links.nextJsDemo} target="_blank" rel="noopener">
            See demo
          </a>
        </Button>
      </Flex>
    </Section>
  );
};

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { LinesBox, SmartLink } from "components/ui";
import { Section } from "components/ui/section";
import { SignupClick } from "components/utils/signup-click";
import type { ReactElement } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

export const Hero = (): ReactElement => {
  return (
    <Section
      innerClassName={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "space40",
      })}
      outerClassName={css({
        paddingTop: "80px",
        paddingBottom: "80px",
        position: "relative",

        overflow: "hidden",

        md: {
          paddingTop: "128px",
          paddingBottom: "96px",
        },
      })}
      sectionPadding="none"
    >
      <Flex flexDirection="column" gap="space12" maxW="728px">
        <Text
          align="center"
          as="h1"
          variant="title5xl"
          className={css({
            animation: "topSlideIn 0.6s ease-out",
          })}
        >
          User onboarding for modern SaaS
        </Text>
        <Text
          align="center"
          className={css({
            maxWidth: "560px",
            marginX: "auto",
            opacity: 0,
            animation: "topSlideIn 0.6s ease-out",
            animationFillMode: "forwards",
            animationDelay: "0.3s",
          })}
          color="muted"
          variant="bodyL"
        >
          A better way to drive product adoption and activation.
        </Text>
      </Flex>
      <LinesBox
        className={css({
          width: "100%",
        })}
      >
        <Flex
          alignItems="center"
          flexDirection="column"
          gap="space16"
          width="100%"
          opacity={0}
          animation="topSlideIn 0.6s ease-out"
          animationDelay="0.6s"
          animationFillMode="forwards"
        >
          <SignupClick>
            <Button
              asChild
              className={css({
                paddingX: "space48",
              })}
              shadow="highlight"
              size="large"
            >
              <SmartLink href={links.signUp}>Start for free</SmartLink>
            </Button>
          </SignupClick>
        </Flex>
      </LinesBox>
    </Section>
  );
};

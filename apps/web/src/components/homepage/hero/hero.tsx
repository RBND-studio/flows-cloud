import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { LinesBox, SmartLink } from "components/ui";
import { Section } from "components/ui/section";
import { SignupClick } from "components/utils/signup-click";
import Image from "next/image";
import type { ReactElement } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

const ProductHunt = () => {
  return (
    <a
      href="https://www.producthunt.com/posts/flows-5?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-flows&#0045;5"
      target="_blank"
      rel="noopener"
      className={css({
        marginX: "auto",
      })}
    >
      <Image
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=465680&theme=light"
        alt="Flows - User&#0032;onboarding&#0032;for&#0032;modern&#0032;SaaS | Product Hunt"
        className={css({
          width: "250px",
          height: "54px",
          opacity: 0,
          animation: "topSlideIn 0.6s ease-out",
          animationDelay: "0.8s",
          animationFillMode: "forwards",
        })}
        width="250"
        height="54"
        unoptimized
      />
    </a>
  );
};

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
        <ProductHunt />
        {/* <HeroCallout link={links.docs.migrateToFlows} delay={0.8}>
          Transitioning to Flows from another platform? We can help!
        </HeroCallout> */}
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

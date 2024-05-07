import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { ThemeImage } from "components/theme-image";
import { SmartLink } from "components/ui";
import { Section } from "components/ui/section";
import { SignupClick } from "components/utils/signup-click";
import { ArrowRight16 } from "icons";
import type { ReactElement } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

import heroDarkImg from "./hero-dark.webp";
import heroLightImg from "./hero-light.webp";
import heroMobileDarkImg from "./hero-mobile-dark.webp";
import heroMobileLightImg from "./hero-mobile-light.webp";

export const Hero = (): ReactElement => {
  return (
    <Section
      background="transparent"
      innerClassName={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "space40",
      })}
      outerClassName={css({
        paddingTop: "80px",
        paddingBottom: "140px",
        position: "relative",

        overflow: "hidden",

        md: {
          paddingTop: "160px",
          paddingBottom: "140px",
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
          Flows lets you build any onboarding you want. Guide users, increase feature adoption, and
          improve revenue.
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        flexDirection="column"
        gap="space16"
        maxWidth="240px"
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
              width: "100%",
            })}
            shadow="highlight"
            size="large"
          >
            <SmartLink href={links.signUp}>Sign up for free</SmartLink>
          </Button>
        </SignupClick>
        <Button
          asChild
          className={css({
            maxWidth: "240px",
            width: "100%",
          })}
          endIcon={<ArrowRight16 />}
          size="large"
          variant="ghost"
        >
          <SmartLink href={links.nextJsDemo} target="_blank">
            See demo
          </SmartLink>
        </Button>
      </Flex>
      <Box
        display="unset"
        mdDown={{
          display: "none",
        }}
      >
        <ThemeImage
          alt=""
          className={css({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
            maxWidth: "1440px",
          })}
          fetchPriority="high"
          quality={90}
          sizes="1440px"
          srcDark={heroDarkImg}
          srcLight={heroLightImg}
        />
      </Box>
      <Box
        display="none"
        mdDown={{
          display: "unset",
        }}
      >
        <ThemeImage
          alt=""
          className={css({
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "-1",
            maxWidth: "780px",
          })}
          fetchPriority="high"
          srcDark={heroMobileDarkImg}
          srcLight={heroMobileLightImg}
          quality={85}
          sizes="896px"
        />
      </Box>
    </Section>
  );
};

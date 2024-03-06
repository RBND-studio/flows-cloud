import { css } from "@flows/styled-system/css";
import { Section } from "components/ui/section";
import { SignupClick } from "components/utils/signup-click";
import Image from "next/image";
import type { ReactElement } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

export const CtaBanner = (): ReactElement => {
  return (
    <Section
      background="bg"
      innerClassName={css({
        display: "flex",
        flexDirection: "column",
        gap: "space24",
        alignItems: "center",
      })}
      outerClassName={css({
        backgroundImage: "radial-gradient(token(colors.special.dotBg) 1px, transparent 0)",
        backgroundSize: "16px 16px",
      })}
    >
      <Image alt="Logo" height={72} src="/images/logo/logo.svg" width={72} />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "space8",
          alignItems: "center",
        })}
      >
        <Text align="center" as="h2" variant="title3xl">
          Try Flows today
        </Text>
        <Text align="center" variant="bodyM">
          With forever free plan, see what Flows can do.
        </Text>
      </div>
      <SignupClick>
        <Button
          asChild
          className={css({
            maxWidth: "240px",
            width: "100%",
          })}
          shadow="highlight"
          size="large"
        >
          <a href={links.signUp}>Sign up for free</a>
        </Button>
      </SignupClick>
    </Section>
  );
};

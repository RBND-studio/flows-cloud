import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { HeroCallout, Section, SmartLink } from "components/ui";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

import { PricingCalculator } from "./pricing-calculator";
import { PricingFaq } from "./pricing-faq";
import { VolumeTable } from "./volume-table";

export const metadata: Metadata = {
  metadataBase: new URL("https://flows.sh"),
  title: "Pricing – Flows",
  description:
    "The new standard for building user onboarding. With volume pricing starting at $0/month.",
  openGraph: {
    type: "website",
    title: "Pricing – Flows",
    description:
      "The new standard for building user onboarding. With volume pricing starting at $0/month.",
    images: "/og.png",
    url: "/pricing",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing – Flows",
    description:
      "The new standard for building user onboarding. With volume pricing starting at $0/month.",
    images: "/og.png",
    creator: "@flows_sh",
  },
};

const Page = (): ReactElement => {
  return (
    <>
      <Section
        innerClassName={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "space24",
          paddingBottom: "space24!",
        })}
      >
        <Flex flexDirection="column" gap="space12" maxW="800px">
          <HeroCallout link={links.docs.migrateToFlows}>
            Switching from another platform? Get free usage!
          </HeroCallout>
          <Text align="center" as="h1" variant="title4xl">
            Pricing
          </Text>
          <Text
            align="center"
            className={css({
              maxWidth: "600px",
              marginX: "auto",
              textWrap: "balance",
            })}
            color="muted"
            variant="bodyL"
          >
            Flows offer a usage-based pricing that starts at $0/month with a generous free forever
            tier.
          </Text>
        </Flex>
        <Button asChild shadow="highlight" size="large">
          <SmartLink href={links.signUp}>Sign up for free</SmartLink>
        </Button>
      </Section>
      <PricingCalculator />
      <VolumeTable />
      <PricingFaq />
    </>
  );
};

export default Page;

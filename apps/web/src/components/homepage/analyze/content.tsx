import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { ThemeImage } from "components/theme-image";
import { FeatureCard, type FeatureCardTypes, LinesBox } from "components/ui";
import { Alert16, Graph16, Stack16 } from "icons";
import type { FC } from "react";

import errorTrackingDark from "./error-tracking-dark.png";
import errorTrackingLight from "./error-tracking-light.png";
import flowAnalyticsDark from "./flow-analytics-dark.png";
import flowAnalyticsLight from "./flow-analytics-light.png";

const mainList: FeatureCardTypes[] = [
  {
    featureIcon: Graph16,
    featureName: "Flow insights",
    mainSlot: (
      <>
        <span>Optimize for conversion.</span> Know how your flows perform at each step.
      </>
    ),
    illustration: (
      <ThemeImage
        alt="Funnel chart illustration"
        srcDark={flowAnalyticsDark}
        srcLight={flowAnalyticsLight}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
      />
    ),
  },
  {
    featureIcon: Alert16,
    featureName: "Error tracking",
    mainSlot: (
      <>
        <span>Spot issues and fix them.</span> See where and why flows fail.
      </>
    ),
    illustration: (
      <ThemeImage
        alt="Error tracking illustration"
        srcDark={errorTrackingDark}
        srcLight={errorTrackingLight}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
      />
    ),
  },
];

export const Content: FC = () => {
  return (
    <LinesBox>
      <Flex flexDirection="column" gap="space16">
        <Flex
          className={css({
            flexDir: { smDown: "column" },
          })}
          gap="space16"
        >
          {mainList.map((item) => {
            return <FeatureCard key={item.featureName} {...item} />;
          })}
        </Flex>
        <FeatureCard
          featureIcon={Stack16}
          featureName="Analytics integration"
          mainSlot={
            <>
              <span>Bring your own analytics tool.</span> Send flow events anywhere you need to get
              the full picture.
            </>
          }
        />
      </Flex>
    </LinesBox>
  );
};

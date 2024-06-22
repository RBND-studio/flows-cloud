import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { ThemeImage } from "components/theme-image";
import { FeatureCard, type FeatureCardTypes, LinesBox } from "components/ui";
import { Hourglass16, Storage16 } from "icons";
import type { FC } from "react";
import { Text } from "ui";

import bundleSizeDark from "./bundle-size-dark.png";
import bundleSizeLight from "./bundle-size-light.png";
import deliverySpeedDark from "./delivery-speed-dark.png";
import deliverySpeedLight from "./delivery-speed-light.png";

const mainList: FeatureCardTypes[] = [
  {
    featureIcon: Hourglass16,
    featureName: "Optimized delivery",
    mainSlot: (
      <>
        <span>Speed as a priority.</span> Your users won’t wait for the tour to load. That’s why
        Flows show{" "}
        <span
          className={css({
            color: "text.primary!",
          })}
        >
          instantly*
        </span>
      </>
    ),
    illustration: (
      <>
        <ThemeImage
          alt="Chart illustrating delivery speed"
          srcDark={deliverySpeedDark}
          srcLight={deliverySpeedLight}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
        />
        <Text
          className={css({
            paddingX: "space16",
            paddingBottom: "space16",
          })}
          color="subtle"
          variant="bodyS"
        >
          *anytime after initial load which takes ~300ms
        </Text>
      </>
    ),
  },
  {
    featureIcon: Storage16,
    featureName: "Script size",
    mainSlot: (
      <>
        <span>Robust product tours.</span> Rest easy knowing that your onboarding shows up every
        time.
      </>
    ),
    illustration: (
      <ThemeImage
        alt="Bundle size illustration"
        className={css({
          marginY: "auto",
        })}
        srcDark={bundleSizeDark}
        srcLight={bundleSizeLight}
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
          mainSlot={
            <>
              <span>Privacy first.</span> We don&apos;t collect any information about your users.
            </>
          }
        />
      </Flex>
    </LinesBox>
  );
};

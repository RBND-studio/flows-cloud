import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { ThemeImage } from "components/theme-image";
import { FeatureCard, type FeatureCardTypes } from "components/ui";
import { Hourglass16, Storage16 } from "icons";
import type { FC } from "react";
import { Text } from "ui";

import bundleSizeDark from "./bundle-size-dark.webp";
import bundleSizeLight from "./bundle-size-light.webp";
import deliverySpeedDark from "./delivery-speed-dark.webp";
import deliverySpeedLight from "./delivery-speed-light.webp";

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
        <span>Tiny size.</span> Flows script is just{" "}
        <span
          className={css({
            color: "text.primary!",
          })}
        >
          ~20kB
        </span>
        . Bundle it with your app or load from CDN.
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
    <Flex
      className={css({
        flexDir: { smDown: "column" },
      })}
      gap="space32"
    >
      {mainList.map((item) => {
        return <FeatureCard key={item.featureName} {...item} />;
      })}
    </Flex>
  );
};

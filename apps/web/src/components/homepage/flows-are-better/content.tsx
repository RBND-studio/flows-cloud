import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { ThemeImage } from "components/theme-image";
import { FeatureCard, type FeatureCardTypes } from "components/ui";
import type { FC } from "react";

import fastDark from "./fast-dark.webp";
import fastLight from "./fast-light.webp";
import flexibleDark from "./flexible-dark.webp";
import flexibleLight from "./flexible-light.webp";
import privacyDark from "./privacy-dark.webp";
import privacyLight from "./privacy-light.webp";

const mainList: FeatureCardTypes[] = [
  {
    mainSlot: (
      <>
        <span>Fast.</span> Optimized performance that beats the competition.
      </>
    ),
    illustration: (
      <ThemeImage
        alt="Delivery speed"
        className={css({
          mdDown: {
            maxWidth: "280px",
            marginX: "auto",
            width: "100%",
          },
        })}
        srcDark={fastDark}
        srcLight={fastLight}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 320px"
      />
    ),
  },
  {
    mainSlot: (
      <>
        <span>Flexible.</span> Build anything you want, however you want. We give you the tools.
      </>
    ),
    illustration: (
      <ThemeImage
        alt="Delivery speed"
        className={css({
          mdDown: {
            maxWidth: "280px",
            marginX: "auto",
            width: "100%",
          },
        })}
        srcDark={flexibleDark}
        srcLight={flexibleLight}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 320px"
      />
    ),
  },
  {
    mainSlot: (
      <>
        <span>Privacy first.</span> We don&apos;t collect any information about your users.
      </>
    ),
    illustration: (
      <ThemeImage
        alt="Delivery speed"
        className={css({
          mdDown: {
            maxWidth: "280px",
            marginX: "auto",
            width: "100%",
          },
        })}
        srcDark={privacyDark}
        srcLight={privacyLight}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 320px"
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
      {mainList.map((item, i) => {
        // eslint-disable-next-line react/no-array-index-key -- fixed order
        return <FeatureCard key={i} {...item} reverse />;
      })}
    </Flex>
  );
};

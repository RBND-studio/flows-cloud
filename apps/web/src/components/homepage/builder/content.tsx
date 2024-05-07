import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { ThemeImage } from "components/theme-image";
import { FeatureCard, type FeatureCardTypes } from "components/ui/feature-card";
import { Cloud16, Code16, Versions16 } from "icons";
import type { FC } from "react";

import flowDiagramDark from "./flow-diagram-dark.webp";
import flowDiagramLight from "./flow-diagram-light.webp";
import inCodeDark from "./in-code-dark.webp";
import inCodeLight from "./in-code-light.webp";
import noCodeDark from "./no-code-dark.webp";
import noCodeLight from "./no-code-light.webp";

const mainList: FeatureCardTypes[] = [
  {
    featureIcon: Cloud16,
    featureName: "No-code",
    mainSlot: (
      <>
        <span>Experiment in real-time.</span> Detach from release cycles and iterate on flows as you
        wish.
      </>
    ),
    illustration: (
      <ThemeImage
        alt="Flow tooltip illustration"
        srcDark={noCodeDark}
        srcLight={noCodeLight}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
      />
    ),
  },
  {
    featureIcon: Code16,
    featureName: "In-code",
    mainSlot: (
      <>
        <span>Keep things stable.</span> Define flows inside your codebase and prevent any
        bottlenecks.
      </>
    ),
    illustration: (
      <ThemeImage
        alt="Code implementation illustration"
        srcDark={inCodeDark}
        srcLight={inCodeLight}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
      />
    ),
  },
];

//TODO: Add mobile version of the diagram illustration
export const Content: FC = () => {
  return (
    <Flex flexDirection="column" gap="space32">
      <FeatureCard
        featureIcon={Versions16}
        featureName="Advanced flow builder"
        illustration={
          <Box
            display="unset"
            smDown={{
              display: "none",
            }}
          >
            <ThemeImage
              alt="Onboarding flow diagram illustration"
              srcDark={flowDiagramDark}
              srcLight={flowDiagramLight}
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </Box>
        }
        mainSlot={
          <>
            <span>Total control.</span> Create the onboarding experiences you want without any
            limitations. Built with modern SaaS in mind.
          </>
        }
      />
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
    </Flex>
  );
};

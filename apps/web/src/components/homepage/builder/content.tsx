import { Grid } from "@flows/styled-system/jsx";
import { ThemeImage } from "components/theme-image";
import { FeatureCard, type FeatureCardTypes, LinesBox } from "components/ui/feature-card";
import type { FC } from "react";

import inCodeDark from "./in-code-dark.webp";
import inCodeLight from "./in-code-light.webp";
import noCodeDark from "./no-code-dark.webp";
import noCodeLight from "./no-code-light.webp";

const mainList: FeatureCardTypes[] = [
  {
    mainSlot: (
      <>
        <span>Visual flow builder.</span> Build out your onboarding and education experience with an
        advanced visual flow builder.
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
    mainSlot: (
      <>
        <span>Segment users.</span> Control which users or companies can see specific onboarding
        flows.
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
  {
    mainSlot: (
      <>
        <span>Wait for user actions.</span> Real world isn&apos;t linear, your flows shouldn’t be
        either. Give users time to do an action or to navigate to different page.
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
  {
    mainSlot: (
      <>
        <span>Branch out when needed.</span> Create personalized flows with built-in branching logic
        based on user actions.
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

export const Content: FC = () => {
  return (
    <LinesBox>
      <Grid gridTemplateColumns={{ _default: "1fr", sm: "1fr 1fr" }} gap="space16">
        {mainList.map((item, i) => {
          // eslint-disable-next-line react/no-array-index-key -- order wont change
          return <FeatureCard key={i} {...item} />;
        })}
      </Grid>
    </LinesBox>
  );
};

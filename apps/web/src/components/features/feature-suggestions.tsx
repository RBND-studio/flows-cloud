import { Grid } from "@flows/styled-system/jsx";
import { featuresData } from "app/features/content";
import { SmallFeatureCard } from "components/ui";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  featureSectionTitle: string;
};

export const FeatureSuggestions: FC<Props> = ({ featureSectionTitle }) => {
  const section = featuresData.find((s) => s.title === featureSectionTitle);
  if (!section) throw new Error("Section not found");
  const prevSection = featuresData.at(featuresData.indexOf(section) - 1);
  const prevFeature = prevSection?.features.at(-1);
  const nextSection = featuresData.at(featuresData.indexOf(section) + 1) ?? featuresData.at(0);
  const nextFeature = nextSection?.features.at(0);

  return (
    <Grid gap="space16" gridTemplateColumns={[1, 1, 1, 2]}>
      <div>
        {prevFeature ? (
          <Link href={prevFeature.link} key={prevFeature.link}>
            <SmallFeatureCard hover {...prevFeature} />
          </Link>
        ) : null}
      </div>
      <div>
        {nextFeature ? (
          <Link href={nextFeature.link} key={nextFeature.link}>
            <SmallFeatureCard hover {...nextFeature} />
          </Link>
        ) : null}
      </div>
    </Grid>
  );
};

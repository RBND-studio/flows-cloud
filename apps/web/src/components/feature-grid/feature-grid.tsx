import { Flex, Grid } from "@flows/styled-system/jsx";
import type { SmallFeatureCardTypes } from "components/ui";
import { Section, SmallFeatureCard } from "components/ui";
import { Text } from "ui";

type ExtendedFeatureCardTypes = SmallFeatureCardTypes & { link: string };

export type FeatureGridTypes = {
  features: ExtendedFeatureCardTypes[];
  title: string;
  description: string;
};

//TODO: add hover prop and wrap in Link when sub-pages are ready
export const FeatureGrid = (props: FeatureGridTypes): JSX.Element => {
  return (
    <Section>
      <Flex flexDirection="column" gap="space32">
        <Flex flexDirection="column" gap="space8">
          <Text variant="title3xl">{props.title}</Text>
          <Text color="muted" variant="bodyL">
            {props.description}
          </Text>
        </Flex>
        <Grid gap="space16" gridTemplateColumns={["1", "2", "3"]}>
          {props.features.map((feature) => (
            <SmallFeatureCard key={feature.link} {...feature} />
          ))}
        </Grid>
      </Flex>
    </Section>
  );
};
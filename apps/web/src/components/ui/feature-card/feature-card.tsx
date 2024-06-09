import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Text } from "ui";

import { cardWrapper } from "./card-wrapper";

export type FeatureCardTypes = {
  featureIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  featureName?: string;
  mainSlot: React.ReactNode;
  illustration?: React.ReactNode;
  reverse?: boolean;
};

export const FeatureCard = (props: FeatureCardTypes): JSX.Element => {
  return (
    <Flex padding="space4" background="bg.subtle" borderRadius="radius16">
      <Flex className={cardWrapper({ reverse: props.reverse })}>
        <Flex flexDir="column" gap="space4" padding="space24">
          <Text
            className={css({
              "& span": {
                color: "text",
              },
            })}
            color="subtle"
            variant="titleL"
          >
            {props.mainSlot}
          </Text>
        </Flex>
        {props.illustration}
      </Flex>
    </Flex>
  );
};

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { ArrowRight16 } from "icons";
import { Icon, Text } from "ui";

import { cardWrapper } from "./card-wrapper";

export type SmallFeatureCardTypes = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  mainSlot: React.ReactNode;
  hover?: boolean;
};

export const SmallFeatureCard = (props: SmallFeatureCardTypes): JSX.Element => {
  return (
    <Flex
      alignItems="center"
      className={cardWrapper({ hover: props.hover })}
      flexDir="row"
      gap="space12"
      padding="space16"
    >
      <Flex bor="1px" borderRadius="radius8" padding="space12">
        <Icon icon={props.icon} />
      </Flex>
      <Flex alignItems="center" mdDown={{ gap: "space8" }}>
        <Text
          className={css({
            "& span": {
              color: "text",
            },
          })}
          color="muted"
          variant="titleM"
        >
          {props.mainSlot}
        </Text>
        <Flex>
          <Icon icon={ArrowRight16} />
        </Flex>
      </Flex>
    </Flex>
  );
};

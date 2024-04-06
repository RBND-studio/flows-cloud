import { Box, Flex } from "@flows/styled-system/jsx";
import { cardWrapper, Section } from "components/ui";
import { type ReactElement } from "react";
import { formatNumberToK, formatNumberWithThousandSeparator, pricingTiers } from "shared";
import { Text } from "ui";

export const VolumeTable = (): ReactElement => {
  const pricing = [
    {
      range: `First ${formatNumberWithThousandSeparator(pricingTiers.free.flowsRange[1])} flows`,
      price: "Free every month",
    },
    {
      range: `${formatNumberToK(pricingTiers.tier1.flowsRange[0])} - ${formatNumberToK(
        pricingTiers.tier1.flowsRange[1],
      )}`,
      price: `$${pricingTiers.tier1.price.toFixed(4)} per flow`,
    },
    {
      range: `${formatNumberToK(pricingTiers.tier2.flowsRange[0])} - ${formatNumberToK(
        pricingTiers.tier2.flowsRange[1],
      )}`,
      price: `$${pricingTiers.tier2.price.toFixed(4)} per flow`,
    },
    {
      range: `${formatNumberToK(pricingTiers.tier3.flowsRange[0])} +`,
      price: `$${pricingTiers.tier3.price.toFixed(4)} per flow`,
    },
  ];

  return (
    <Section sectionPadding="small">
      <Flex flexDirection="column" gap="space8" mb="space32">
        <Text variant="title2xl">Volume pricing</Text>
        <Text variant="bodyL" color="muted">
          Flows offers volume based pricing, the more flows you launch the less you pay.
        </Text>
      </Flex>
      <Box shadow="l2" className={cardWrapper()}>
        {pricing.map((item) => (
          <Flex
            key={item.price}
            paddingX="space24"
            paddingY="space16"
            borBottom="1px"
            justifyContent="space-between"
            _last={{ border: "none" }}
          >
            <Text variant="titleM">{item.range}</Text>
            <Text variant="titleM">{item.price}</Text>
          </Flex>
        ))}
      </Box>
    </Section>
  );
};

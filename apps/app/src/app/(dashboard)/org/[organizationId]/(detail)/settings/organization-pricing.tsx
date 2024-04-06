import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { type OrganizationDetail } from "lib/api";
import { type FC } from "react";
import { formatNumberWithThousandSeparator } from "shared";
import { Text } from "ui";

type Props = {
  org: OrganizationDetail;
};

export const OrganizationPricing: FC<Props> = ({ org }) => {
  const subscription = org.subscription;

  let prevUnits = 0;
  const priceTiersRender = subscription?.price_tiers.map((tier, i) => {
    const lastUnit = tier.last_unit === "inf" ? Infinity : Number(tier.last_unit);
    const price = Number(tier.unit_price_decimal) * 0.01;
    const result = (
      <Flex
        gap="space16"
        // eslint-disable-next-line react/no-array-index-key -- ignore
        key={i}
      >
        <Text className={css({ width: "240px" })} color="muted">
          <Text as="span" weight="600" color="default">
            {formatNumberWithThousandSeparator(prevUnits)}
            {lastUnit === Infinity
              ? " +"
              : ` - ${formatNumberWithThousandSeparator(lastUnit)}`}{" "}
          </Text>
          started flows
        </Text>
        <Text>{price ? `$${price.toFixed(4)}` : "Free"}</Text>
      </Flex>
    );
    prevUnits = lastUnit;
    return result;
  });

  return (
    <Flex direction="column" cardWrap="-" p="space16" mb="space16">
      <Flex gap="space16" justifyContent="space-between" mb="space16">
        <Flex flexDirection="column">
          <Text variant="titleL">Pricing</Text>
          <Text color="muted">
            Your current pricing tiers. The final price is calculated based on the number of flows
            you start durring the billing period.
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap="space4">
        {priceTiersRender}
      </Flex>
    </Flex>
  );
};

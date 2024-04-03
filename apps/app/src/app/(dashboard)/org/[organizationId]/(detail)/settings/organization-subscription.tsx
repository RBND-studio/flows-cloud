import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { type OrganizationDetail } from "lib/api";
import { monthDayYear } from "lib/date";
import { type FC } from "react";
import { Text } from "ui";

import { CancelSubscription } from "./cancel-subscription";
import { CheckoutButton } from "./checkout-button";
import { OrganizationLimit } from "./organization-limit";

type Props = {
  org: OrganizationDetail;
};

export const OrganizationSubscription: FC<Props> = ({ org }) => {
  const subscription = org.subscription;
  const hasActiveSubscription = !!subscription;

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
        <Text className={css({ width: "200px" })}>
          {prevUnits}
          {lastUnit === Infinity ? " +" : ` - ${lastUnit}`}
        </Text>
        <Text>{price ? `$${price.toFixed(4)}` : "Free"}</Text>
      </Flex>
    );
    prevUnits = lastUnit;
    return result;
  });

  return (
    <Flex direction="column" gap="space16" cardWrap="-" p="space16" mb="space16">
      <Flex>
        <Box flex={1}>
          <Text variant="titleL">Subscription</Text>
        </Box>
        {!hasActiveSubscription && <CheckoutButton organizationId={org.id} />}
      </Flex>

      {subscription ? (
        <>
          <OrganizationLimit organization={org} />

          <div>
            <Text>Renews: {monthDayYear(subscription.renews_at)}</Text>
            {subscription.ends_at ? <Text>Ends: {monthDayYear(subscription.ends_at)}</Text> : null}
            <Text>Created: {monthDayYear(subscription.created_at)}</Text>
            <Text>Updated: {monthDayYear(subscription.updated_at)}</Text>
            <Text>Status: {subscription.status_formatted}</Text>
            <Text>Email: {subscription.email}</Text>
            <Text>Name: {subscription.name}</Text>
            <Text variant="titleS">Pricing</Text>
            {priceTiersRender}
            <CancelSubscription subscriptionId={subscription.id} organizationId={org.id} />
          </div>
        </>
      ) : (
        <Text>No subscription</Text>
      )}
    </Flex>
  );
};

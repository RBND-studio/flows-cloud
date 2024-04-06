import { Flex } from "@flows/styled-system/jsx";
import dayjs from "dayjs";
import { type OrganizationDetail } from "lib/api";
import { monthDayYear } from "lib/date";
import { type FC } from "react";
import { formatNumberWithThousandSeparator, pricingTiers } from "shared";
import { Text } from "ui";

import { OrganizationLimitInput } from "./organization-limit-input";

type Props = {
  org: OrganizationDetail;
};

export const OrganizationLimit: FC<Props> = ({ org }) => {
  const subscription = org.subscription;
  const hasActiveSubscription = !!subscription;
  const renewal = subscription
    ? subscription.renews_at
    : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString();

  return (
    <Flex direction="column" cardWrap="-" p="space16" mb="space16">
      <Flex gap="space16" justifyContent="space-between" mb="space16">
        <Flex flexDirection="column">
          <Text variant="titleL">Usage limit</Text>
          <Text color="muted">
            Limit resets on {monthDayYear(renewal)} ({dayjs(renewal).fromNow()}). Limit how many
            flows can launch in a billing period to prevent unexpected charges. Note that sometimes
            the limit can be exceed if there is a high volume of flows running at the same time.
          </Text>
        </Flex>
      </Flex>
      {hasActiveSubscription ? (
        <OrganizationLimitInput organization={org} />
      ) : (
        <Text color="muted">
          {formatNumberWithThousandSeparator(pricingTiers.free.flowsRange[1])} free flows per month.
          To increase your limit subscribe to a paid plan.
        </Text>
      )}
    </Flex>
  );
};

import { Box, Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { monthDayYear } from "lib/date";
import { load } from "lib/load";
import { Text } from "ui";

import { CheckoutButton } from "./checkout-button";

type Props = {
  organizationId: string;
};

export const OrganizationSubscription = async ({ organizationId }: Props): Promise<JSX.Element> => {
  const subscriptions = await load(
    api["/organizations/:organizationId/subscriptions"](organizationId),
  );

  return (
    <Box cardWrap="-" p="space16" mb="space16">
      <Flex>
        <Box flex={1}>
          <Text>Subscription</Text>
        </Box>
        <CheckoutButton organizationId={organizationId} />
      </Flex>
      {!subscriptions.length && <Text>No subscriptions</Text>}
      {subscriptions.map((subscription) => (
        <Box key={subscription.id}>
          <Text>Renews: {monthDayYear(subscription.renews_at)}</Text>
          {subscription.ends_at ? <Text>Ends {monthDayYear(subscription.ends_at)}</Text> : null}
          <Text>Status: {subscription.status_formatted}</Text>
          <Text>Email: {subscription.email}</Text>
          <Text>Name: {subscription.name}</Text>
        </Box>
      ))}
    </Box>
  );
};

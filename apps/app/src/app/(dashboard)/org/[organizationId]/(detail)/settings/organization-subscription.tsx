import { Flex } from "@flows/styled-system/jsx";
import { Usage } from "components/sidebar/usage";
import dayjs from "dayjs";
import { type OrganizationDetail } from "lib/api";
import { monthDayYear } from "lib/date";
import Link from "next/link";
import { type FC } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

import { CancelSubscription } from "./cancel-subscription";
import { CheckoutButton } from "./checkout-button";
import { ManageSubscription } from "./manage-subscription";

type Props = {
  org: OrganizationDetail;
};

export const OrganizationSubscription: FC<Props> = ({ org }) => {
  const subscription = org.subscription;
  const hasActiveSubscription = !!subscription;
  const estimate = org.estimated_price;
  const renewal = subscription
    ? subscription.renews_at
    : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString();

  return (
    <Flex direction="column" cardWrap="-" p="space16" mb="space16" gap="space16">
      <Flex gap="space16" justifyContent="space-between">
        <Flex flexDirection="column">
          <Flex alignItems="center" gap="space8">
            <Text variant="titleL">Subscription</Text>
            <Flex
              background="bg"
              bor="1px"
              borderColor="border.strong"
              borderRadius="radius12"
              paddingX="6px"
            >
              <Text color="muted" weight="600">
                {subscription?.status_formatted ?? "Free"}
              </Text>
            </Flex>
          </Flex>
          <Text color="muted">
            Renews on {monthDayYear(renewal)} ({dayjs(renewal).fromNow()})
            {subscription?.ends_at ? ` • Ends: ${monthDayYear(subscription.ends_at)}` : null}
          </Text>
        </Flex>

        <Flex gap="space8">
          {!hasActiveSubscription && (
            <>
              <Button variant="secondary" asChild>
                <Link target="_blank" href={links.pricing}>
                  View pricing
                </Link>
              </Button>
              <CheckoutButton organizationId={org.id} />
            </>
          )}
          {hasActiveSubscription ? (
            <>
              <ManageSubscription subscriptionId={subscription.id} />
              <CancelSubscription subscriptionId={subscription.id} organizationId={org.id} />
            </>
          ) : null}
        </Flex>
      </Flex>

      <Usage />

      <Text variant="titleS">
        Total price:{" "}
        <Text as="span" color="muted">
          {subscription ? (
            <>${estimate ? estimate.toFixed(4) : "0.00"} + tax (if applicable)</>
          ) : (
            "Free"
          )}
        </Text>
      </Text>
    </Flex>
  );
};

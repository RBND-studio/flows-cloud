"use client";

import { Flex } from "@flows/styled-system/jsx";
import { useFetch } from "hooks/use-fetch";
import Link from "next/link";
import { routes } from "routes";
import { Button, Text } from "ui";

import { Usage } from "./usage";

type Props = {
  organizationId: string;
};

export const UsageWidget = ({ organizationId }: Props): JSX.Element | null => {
  const { data } = useFetch(
    "/organizations/:organizationId",
    organizationId ? [organizationId] : null,
  );

  if (!data) {
    return null;
  }

  const paymentIssue = data.subscription && data.subscription.status !== "active";

  return (
    <Flex
      flexDirection="column"
      gap="space8"
      backgroundColor="bg.muted"
      bor="1px"
      borderRadius="radius8"
      p="space8"
      marginX="space8"
    >
      <Usage />

      {paymentIssue ? (
        <>
          <Text>There was an issue charging your card</Text>
          <Button asChild size="small">
            <Link href={routes.organizationSettings({ organizationId })}>Fix payment</Link>
          </Button>
        </>
      ) : null}

      {data.subscription ? (
        <Button size="small" variant="secondary" shadow="none" asChild>
          <Link href={routes.organizationSettings({ organizationId })}>Subscription</Link>
        </Button>
      ) : (
        <Button size="small" variant="black" shadow="none" asChild>
          <Link href={routes.organizationSettings({ organizationId })}>Upgrade</Link>
        </Button>
      )}
    </Flex>
  );
};

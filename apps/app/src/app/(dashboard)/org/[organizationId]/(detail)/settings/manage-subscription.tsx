import { api } from "lib/api";
import { load } from "lib/load";
import Link from "next/link";
import { type FC } from "react";
import { Button } from "ui";

type Props = {
  subscriptionId: string;
};

export const ManageSubscription: FC<Props> = async ({ subscriptionId }) => {
  const subscription = await load(api["/subscriptions/:subscriptionId"](subscriptionId));

  return (
    <Button variant="secondary" asChild>
      <Link target="_blank" href={subscription.customer_portal_url}>
        Manage subscription
      </Link>
    </Button>
  );
};

"use client";

import { useAuth } from "auth/client";
import Script from "next/script";
import { type FC, useState } from "react";
import { Button } from "ui";

type Props = {
  organizationId: string;
};

export const CheckoutButton: FC<Props> = ({ organizationId }) => {
  const { auth } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const checkoutBase = "https://flows-sh.lemonsqueezy.com/buy/7725e266-a4b6-46e7-accf-72c4b3ff5054";
  const checkoutParameters = {
    embed: "1",
    "checkout[email]": auth?.user.email ?? "",
    "checkout[name]": auth?.user.name ?? "",
    "checkout[custom][organization_id]": organizationId,
  };
  const checkoutUrl = `${checkoutBase}?${new URLSearchParams(checkoutParameters).toString()}`;

  return (
    <>
      <Button disabled={!initialized} asChild>
        <a href={checkoutUrl} className="lemonsqueezy-button">
          Buy Flows Subscription
        </a>
      </Button>
      <Script
        src="https://assets.lemonsqueezy.com/lemon.js"
        defer
        onReady={() => {
          window.createLemonSqueezy();
          setInitialized(true);
        }}
      />
    </>
  );
};

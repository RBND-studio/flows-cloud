"use client";

import { POSTHOG_KEY } from "lib/constants";
import { posthog } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import type { FC, ReactNode } from "react";

if (typeof window !== "undefined") {
  posthog.init(POSTHOG_KEY, {
    api_host: "https://app.posthog.com",
  });
}
type Props = {
  children?: ReactNode;
};

export const PosthogProvider: FC<Props> = ({ children }) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

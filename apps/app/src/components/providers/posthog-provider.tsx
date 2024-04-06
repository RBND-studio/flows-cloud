"use client";

import { POSTHOG_KEY, PRODUCTION } from "lib/constants";
import { posthog } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import type { FC, ReactNode } from "react";

if (typeof window !== "undefined" && PRODUCTION) {
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

export const showSurvey = (surveyId: "feedback-survey"): void => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("seenSurvey_")) localStorage.removeItem(key);
  });
  localStorage.removeItem("lastSeenSurveyDate");
  document.querySelectorAll("[class^='PostHogSurvey']").forEach((el) => el.remove());
  document.querySelectorAll(`.${surveyId}`).forEach((el) => el.remove());

  const targetEl = document.createElement("div");
  targetEl.classList.add(surveyId);
  document.body.appendChild(targetEl);
};

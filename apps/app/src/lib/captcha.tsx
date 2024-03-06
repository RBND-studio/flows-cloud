import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_SITE_KEY } from "lib/constants";
import type { FC } from "react";

type Props = {
  action: string;
};

export const Captcha: FC<Props> = ({ action }) => {
  return (
    <Turnstile
      options={{ appearance: "interaction-only", action, responseFieldName: "captchaToken" }}
      siteKey={TURNSTILE_SITE_KEY}
    />
  );
};

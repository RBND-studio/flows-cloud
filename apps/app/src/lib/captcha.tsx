/* cspell:disable-next-line */
import { css } from "@flows/styled-system/css";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_SITE_KEY } from "lib/constants";
import { forwardRef } from "react";

type Props = {
  action: string;
};

export const Captcha = forwardRef<TurnstileInstance, Props>(function Captcha({ action }, ref) {
  return (
    <Turnstile
      options={{ appearance: "interaction-only", action, responseFieldName: "captchaToken" }}
      className={css({
        "& .cf-turnstile-wrapper": {
          display: "flex",
        },
      })}
      ref={ref}
      siteKey={TURNSTILE_SITE_KEY}
    />
  );
});

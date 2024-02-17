/* cspell:disable-next-line */
import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_SITE_KEY } from "lib/constants";
import type { FC } from "react";

type Props = {
  action: string;
  onSuccess: (token: string) => void;
};

export const Captcha: FC<Props> = ({ action, onSuccess }) => {
  return (
    <Turnstile
      onSuccess={onSuccess}
      options={{ size: "invisible", action }}
      siteKey={TURNSTILE_SITE_KEY}
    />
  );
};

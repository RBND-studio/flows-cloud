import { css } from "@flows/styled-system/css";
import type { Metadata } from "next";
import Link from "next/link";
import { links } from "shared";
import { Text } from "ui";

import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
  title: "Login | Flows",
};

export default function SignUp(): JSX.Element {
  return (
    <>
      <SignUpForm />
      <Text
        align="center"
        className={css({
          mt: "space24",
        })}
        color="muted"
        variant="bodyXs"
      >
        By creating an account, you agree to the{" "}
        <Link
          className={css({
            textDecoration: "underline",
            color: "text",
          })}
          href={links.terms}
          target="_blank"
        >
          Terms of service
        </Link>{" "}
        and{" "}
        <Link
          className={css({
            textDecoration: "underline",
            color: "text",
          })}
          href={links.privacy}
          target="_blank"
        >
          Privacy policy
        </Link>
      </Text>
    </>
  );
}

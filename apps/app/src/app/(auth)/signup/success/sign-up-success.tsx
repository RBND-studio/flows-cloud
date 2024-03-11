"use client";

import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { routes } from "routes";
import { Text } from "ui";

export const SignUpSuccess = (): JSX.Element => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <>
      <Box borderRadius="radius12" cardWrap="-" padding="space24">
        <Text
          align="center"
          className={css({
            mb: "space24",
          })}
          variant="titleXl"
        >
          Check your email
        </Text>

        <Text align="center" className={css({ mb: "space24" })}>
          We&apos;ve sent a verification link.
          <br />
          Please check your inbox at{" "}
          <Text as="span" weight="700">
            {email}
          </Text>
        </Text>

        <Text align="center" color="muted">
          Back to{" "}
          <Link
            className={css({
              textDecoration: "underline",
              color: "text",
            })}
            href={routes.login()}
          >
            login
          </Link>
        </Text>
      </Box>
      <Text
        align="center"
        className={css({
          mt: "space24",
        })}
        color="muted"
        variant="bodyXs"
      >
        Having trouble? Contact support at <strong>hello@flows.sh</strong>
      </Text>
    </>
  );
};

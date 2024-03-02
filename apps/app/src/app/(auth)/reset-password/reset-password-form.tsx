"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { resetPassword } from "auth/server-actions";
import { Captcha } from "lib/captcha";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { Button, Input, Text, toast } from "ui";

export const ResetPasswordForm = (): JSX.Element => {
  const [isPending, startTransition] = useTransition();
  const [captchaToken, setCaptchaToken] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!captchaToken) return;
    const formData = new FormData(event.currentTarget);
    formData.set("captchaToken", captchaToken);

    startTransition(async () => {
      const res = await resetPassword(formData);
      if (res.error) toast.error(res.error.title, { description: res.error.description });
    });
  };

  return (
    <Box borderRadius="radius12" cardWrap="-" padding="space24">
      <Text
        align="center"
        className={css({
          mb: "space4",
        })}
        variant="titleXl"
      >
        Reset your password
      </Text>
      <Text
        align="center"
        className={css({
          mb: "space24",
        })}
        color="muted"
      >
        Enter your email and we&apos;ll send you instructions on how to reset your password.
      </Text>
      <form
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "space16",
        })}
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          name="email"
          placeholder="email@yourcompany.com"
          required
          type="email"
        />

        <Flex direction="column">
          <Captcha action="login" onSuccess={(v) => setCaptchaToken(v)} />
          <Button loading={isPending} name="sign-in" size="medium" type="submit">
            Reset password
          </Button>
        </Flex>
      </form>
      <Text
        align="center"
        className={css({
          mt: "space48",
        })}
        color="muted"
      >
        Go back to{" "}
        <Link
          className={css({
            textDecoration: "underline",
            color: "text",
          })}
          href="/reset-password"
        >
          login
        </Link>
      </Text>
    </Box>
  );
};

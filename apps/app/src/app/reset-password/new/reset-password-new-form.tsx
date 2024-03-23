"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { updatePassword } from "auth/server-actions";
import React, { useRef, useTransition } from "react";
import { Button, Input, Text, toast } from "ui";

export const ResetPasswordNewForm = (): JSX.Element => {
  const [isPending, startTransition] = useTransition();
  const captchaRef = useRef<TurnstileInstance>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const res = await updatePassword(formData);
      if (res.error) {
        toast.error(res.error.title, { description: res.error.description });
        captchaRef.current?.reset();
      }
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
        Create new password
      </Text>
      <form
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "space16",
          marginTop: "space24",
        })}
        onSubmit={handleSubmit}
      >
        <Input
          label="Password"
          minLength={8}
          name="password"
          placeholder="••••••••••"
          required
          type="password"
        />
        <Flex alignItems="center" direction="column" gap="space16">
          <Button
            className={css({
              width: "100%",
            })}
            loading={isPending}
            name="sign-up"
            size="medium"
            type="submit"
          >
            Reset password
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

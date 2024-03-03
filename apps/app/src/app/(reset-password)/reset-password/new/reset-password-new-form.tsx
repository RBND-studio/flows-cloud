"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { updatePassword } from "auth/server-actions";
import { Captcha } from "lib/captcha";
import React, { useTransition } from "react";
import { Button, Input, Text, toast } from "ui";

export const ResetPasswordNewForm = (): JSX.Element => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const res = await updatePassword(formData);
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
          <Captcha action="resetPasswordNew" />
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

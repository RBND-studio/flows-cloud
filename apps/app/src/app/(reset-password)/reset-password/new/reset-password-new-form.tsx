"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { updatePassword } from "auth/server-actions";
import { Captcha } from "lib/captcha";
import React, { useState, useTransition } from "react";
import { createClient } from "supabase/client";
import { Button, Input, Text, toast } from "ui";

export const ResetPasswordNewForm = (): JSX.Element => {
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  const [resetEnabled, setResetEnabled] = useState(false);

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      setResetEnabled(true);
    }
  });

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
        <Flex direction="column">
          <Button
            disabled={!resetEnabled}
            loading={isPending}
            name="sign-up"
            size="medium"
            type="submit"
          >
            Reset password
          </Button>
          <Captcha action="resetPasswordNew" />
        </Flex>
      </form>
    </Box>
  );
};

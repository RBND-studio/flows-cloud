"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Captcha } from "lib/captcha";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { routes } from "routes";
import { createClient } from "supabase/client";
import { Button, Input, Text } from "ui";

export const ResetPasswordNewForm = (): JSX.Element => {
  const router = useRouter();
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- only for test
  const [captchaToken, setCaptchaToken] = useState<string>();

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      router.push(routes.home);
    }
  });
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
        // onSubmit={handleSubmit}
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
            //loading={isPending}
            name="sign-up"
            size="medium"
            type="submit"
          >
            Reset password
          </Button>
          <Captcha action="signUp" onSuccess={(v) => setCaptchaToken(v)} />
        </Flex>
      </form>
    </Box>
  );
};

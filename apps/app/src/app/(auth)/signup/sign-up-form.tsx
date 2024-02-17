"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { LoginMessage } from "app/(auth)/login/login-message";
import { signUp } from "auth/server-actions";
import { GitHub16, Google16 } from "icons";
import { Captcha } from "lib/captcha";
import Link from "next/link";
import type { FC } from "react";
import { useState, useTransition } from "react";
import { routes } from "routes";
import { createClient } from "supabase/client";
import { Button, Input, Text, toast } from "ui";

export const SignUpForm: FC = () => {
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const [captchaToken, setCaptchaToken] = useState<string>();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!captchaToken) return;
    const formData = new FormData(event.currentTarget);
    formData.set("captchaToken", captchaToken);

    startTransition(async () => {
      const res = await signUp(formData);
      if (res.error) toast.error(res.error.title, { description: res.error.description });
    });
  };

  const handleSocialSignIn = async (provider: "google" | "github"): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.origin}/auth/callback`,
      },
    });
  };

  return (
    <Box borderRadius="radius12" cardWrap="-" padding="space24">
      <Text
        align="center"
        className={css({
          mb: "space24",
        })}
        variant="titleXl"
      >
        Get started
      </Text>

      <form
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "space16",
        })}
        onSubmit={handleSubmit}
      >
        <Flex flexDir="column" gap="space12">
          <Button
            disabled={isPending}
            name="sign-up-github"
            onClick={() => handleSocialSignIn("github")}
            size="medium"
            startIcon={<GitHub16 />}
            type="button"
            variant="secondary"
          >
            Sign up with GitHub
          </Button>
          <Button
            disabled={isPending}
            name="sign-up-google"
            onClick={() => handleSocialSignIn("google")}
            size="medium"
            startIcon={<Google16 />}
            type="button"
            variant="secondary"
          >
            Sign up with Google
          </Button>
        </Flex>

        <Text
          align="center"
          className={css({
            my: "space8",
          })}
          color="muted"
        >
          Or use email & password
        </Text>
        <Input
          label="Email"
          name="email"
          placeholder="email@yourcompany.com"
          required
          type="email"
        />
        <Input
          label="Password"
          minLength={8}
          name="password"
          placeholder="••••••••••"
          required
          type="password"
        />
        <LoginMessage />

        <Flex direction="column">
          <Button loading={isPending} name="sign-up" size="medium" type="submit">
            Sign up
          </Button>
          <Captcha action="signUp" onSuccess={(v) => setCaptchaToken(v)} />
        </Flex>

        <Text align="center" color="muted">
          Already have an account?{" "}
          <Link
            className={css({
              textDecoration: "underline",
              color: "text",
            })}
            href={routes.login()}
          >
            Log in
          </Link>
        </Text>
      </form>
    </Box>
  );
};

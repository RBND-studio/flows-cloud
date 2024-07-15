"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { useFetch } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { routes } from "routes";
import { links } from "shared";
import { Button, Switch, Text } from "ui";

type FormValues = {
  marketingConsent: boolean;
};

export const NewsletterForm = (): JSX.Element => {
  const { data: me, mutate } = useFetch("/me");
  const router = useRouter();
  useEffect(() => {
    if (me?.finished_welcome) router.replace(routes.home);
  }, [me?.finished_welcome, router]);

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { marketingConsent: false },
  });
  const { send, loading } = useSend();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const requests: Promise<{ error?: Error }>[] = [
      send(api["PATCH /me"]({ finished_welcome: true }), { errorMessage: null }),
    ];
    if (data.marketingConsent)
      requests.push(send(api["POST /newsletter"](), { errorMessage: "Failed to subscribe" }));

    const responses = await Promise.all(requests);
    if (responses.some((res) => !!res.error)) return;
    await mutate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" alignItems="center" width="100%">
        <Box borderRadius="radius12" cardWrap="-" mb="space24">
          <Flex flexDirection="column" gap="space16" padding="space24" borBottom="1px">
            <Controller
              control={control}
              name="marketingConsent"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={field.onChange}
                  label={
                    <>
                      <Text weight="600" display="block">
                        Subscribe to our newsletter
                      </Text>
                      <Text as="span" variant="bodyXs" display="block" color="muted">
                        Email once a month about new features and changes
                      </Text>
                    </>
                  }
                />
              )}
            />
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" padding="space24">
            <Flex flexDirection="column">
              <Text weight="600">Follow us on Twitter</Text>
              <Text variant="bodyXs" color="muted">
                Tweets about features and tips
              </Text>
            </Flex>
            <Button variant="secondary" asChild>
              <a href={links.twitter} target="_blank" rel="noopener">
                @flows_sh
              </a>
            </Button>
          </Flex>
        </Box>
        <Button
          className={css({
            maxWidth: "200px",
            width: "100%",
          })}
          loading={loading}
          size="default"
          type="submit"
        >
          Continue
        </Button>
      </Flex>
    </form>
  );
};

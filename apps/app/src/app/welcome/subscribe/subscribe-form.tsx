"use client";

import { Flex } from "@flows/styled-system/jsx";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { routes } from "routes";
import { Button, Checkbox } from "ui";

type FormValues = {
  marketingConsent: boolean;
};

export const SubscribeForm = (): JSX.Element => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { marketingConsent: false },
  });
  const router = useRouter();
  const { send, loading } = useSend();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const requests: Promise<{ error?: Error }>[] = [
      send(api["/me"]({ finished_welcome: true }), { errorMessage: null }),
    ];
    if (data.marketingConsent)
      requests.push(send(api["POST /newsletter"](), { errorMessage: "Failed to subscribe" }));

    const responses = await Promise.all(requests);
    if (responses.some((res) => !!res.error)) return;
    await mutate("/me");
    router.replace(routes.home);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="space16">
        <Controller
          control={control}
          name="marketingConsent"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              label="Subscribe to monthly newsletter"
            />
          )}
        />
        <Button loading={loading} size="default" type="submit">
          Continue
        </Button>
      </Flex>
    </form>
  );
};

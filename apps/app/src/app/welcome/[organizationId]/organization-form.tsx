"use client";

import { Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import { Button, Input, toast } from "ui";

type FormValues = {
  name: string;
};

export const OrganizationForm: FC = () => {
  const { handleSubmit, register } = useForm<FormValues>();
  const router = useRouter();
  const { send, loading } = useSend();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await send(api["POST /organizations"](data), {
      errorMessage: t.toasts.createOrgFailed,
    });
    if (!res.data) return;
    toast.success(t.toasts.createOrgSuccess);
    router.push(routes.welcomeOrganization({ organizationId: res.data.id }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="space16">
        <Input {...register("name")} label="Organization name" placeholder="Acme Inc" required />
        <Button loading={loading} size="default" type="submit">
          Create organization
        </Button>
      </Flex>
    </form>
  );
};

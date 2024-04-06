"use client";

import { Flex } from "@flows/styled-system/jsx";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api, type OrganizationDetail } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Input, toast } from "ui";

type Props = {
  organization: OrganizationDetail;
};

type FormValues = {
  start_limit: string;
};

export const OrganizationLimitInput: FC<Props> = ({ organization }) => {
  const { register, formState, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { start_limit: String(organization.limit) },
  });

  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await send(
      api["PATCH /organizations/:organizationId"](organization.id, {
        start_limit: Number(data.start_limit),
      }),
      {
        errorMessage: t.toasts.updateLimitFailed,
      },
    );
    if (res.error) return;
    toast.success(t.toasts.updateLimitSuccess);
    router.refresh();
    void mutate("/organizations/:organizationId", [organization.id]);
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="space8" alignItems="flex-end">
        <Input
          label="Flow limit"
          {...register("start_limit")}
          type="number"
          defaultValue={formState.defaultValues?.start_limit}
        />
        <Button loading={loading} disabled={!formState.isDirty} type="submit">
          Save
        </Button>
      </Flex>
    </form>
  );
};

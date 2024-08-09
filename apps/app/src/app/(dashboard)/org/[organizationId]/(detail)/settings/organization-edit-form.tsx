"use client";

import { css } from "@flows/styled-system/css";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api, type Organization } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Input, Text, toast } from "ui";

type Props = {
  org: Organization;
};

type OrgForm = {
  name: string;
};

export const OrganizationEditForm: FC<Props> = ({ org }) => {
  const { register, handleSubmit, formState, reset } = useForm<OrgForm>({
    defaultValues: createDefaultValues(org),
  });

  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<OrgForm> = async (data) => {
    const res = await send(api["PATCH /organizations/:organizationId"](org.id, data), {
      errorMessage: t.toasts.updateOrgFailed,
    });
    if (res.error) return;
    if (res.data) reset(createDefaultValues(res.data));
    toast.success(t.toasts.updateOrgSuccess);
    void mutate("/organizations/:organizationId", [org.id]);
    router.refresh();
  };

  return (
    <form
      className={css({
        cardWrap: "-",
        p: "space16",
        display: "flex",
        flexDirection: "column",
        gap: "space16",
        mb: "space16",
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text variant="titleL">General</Text>
      <Input
        {...register("name")}
        defaultValue={formState.defaultValues?.name}
        label="Organization name"
      />

      <div>
        <Button disabled={!formState.isDirty} loading={loading} type="submit">
          {t.actions.save}
        </Button>
      </div>
    </form>
  );
};

const createDefaultValues = (org: Organization): OrgForm => ({
  name: org.name,
});

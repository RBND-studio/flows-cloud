"use client";

import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import { Button, Input, toast } from "ui";

type Props = {
  organizationId: string;
};

type FormValues = {
  name: string;
};

export const ProjectForm: FC<Props> = ({ organizationId }) => {
  const { handleSubmit, register } = useForm<FormValues>();
  const router = useRouter();
  const { send, loading } = useSend();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await send(
      api["POST /organizations/:organizationId/projects"](organizationId, data),
      { errorMessage: t.toasts.createProjectFailed },
    );
    if (!res.data) return;
    toast.success(t.toasts.createProjectSuccess);
    router.push(routes.welcomeOrganizationProject({ projectId: res.data.id, organizationId }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("name")} label="Name" />
      <Button loading={loading} size="small" type="submit">
        Create
      </Button>
    </form>
  );
};
